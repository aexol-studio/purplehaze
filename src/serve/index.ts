import { ConfigFile } from '@/config';

import WebSocket from 'ws';
import http from 'http';
import { browserHtml } from '@/browserHtml';
import { runBrowser } from '@/browser';
import { createServer } from 'net';
import fs from 'fs';
import path from 'path';
import { pathGenerated } from '@/paths';
import { envLoader } from '@/loaders/env';

const internals = (config: ConfigFile, build?: boolean) => {
  const ssg = {
    envs: envLoader(),
    config,
    host: build ? `http://0.0.0.0:${config.port}` : '.',
  };
  return `const ssg = ${JSON.stringify(ssg, null, 4)}`;
};

const getPort = (port = 80, maxPort = 65535): Promise<number> => {
  if (maxPort < port) {
    return Promise.reject(
      (() => {
        const e = new Error('EPORTSPEC');
        return e;
      })(),
    );
  }
  const server = createServer();
  return new Promise((resolve, reject) =>
    server
      .once('error', (error) =>
        ++port > maxPort ? reject(error) : server.listen(port),
      )
      .once('listening', () => server.close(() => resolve(port)))
      .listen(port),
  );
};

export const initBrowserBundler = async ({
  config,
}: {
  config: ConfigFile;
}) => {
  const ws = new WebSocket.Server({
    port: config.websocketPort,
    perMessageDeflate: true,
  });
  ws.on('connection', (client) => {
    client.send(JSON.stringify({ type: 'connected' }));
    client.on('message', (e) => {
      ws.clients.forEach((v) => {
        v.send(e);
      });
    });
  });
  const browserBundle = http.createServer((req, res) => {
    const requestURL = req.url;
    if (requestURL === '/' || !requestURL) {
      res.writeHead(200, { 'content-type': 'text/html' });
      const rendererFile = fs
        .readFileSync(path.join(__dirname, './renderer.js'))
        .toString('utf-8')
        .replace('{{WEBSOCKET_PORT}}', config.websocketPort + '');
      res.write(browserHtml(rendererFile));
    } else {
      const [, , ...fileNames] = requestURL.split('/');
      const fileName = fileNames.join('/');
      if (fileName?.endsWith('.js') || fileName?.endsWith('.mjs')) {
        const filePath = pathGenerated(fileName);
        const pathContent = fs.readFileSync(filePath).toString('utf-8');
        const fContent = [internals(config), pathContent].join('\n');
        res.writeHead(200, {
          'content-type': 'text/javascript',
          'Cache-Control': 'max-age=0',
        });
        res.write(fContent);
      }
    }
    res.end();
  });
  const browserBundlePort = await getPort(config.port + 1);
  browserBundle.listen(browserBundlePort);
  const browser = await runBrowser(browserBundlePort);
  return {
    browserBundle,
    ws,
    browser,
    close: async () => {
      ws.close();
      browserBundle.close();
      await browser.close();
    },
  };
};

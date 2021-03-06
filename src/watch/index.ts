import { preBuild } from '@/build';
import { readConfig } from '@/config';
import { isJSFile, isTSFile, isMd, isStaticFile, isEnv } from '@/fsAddons';
import { pathIn, pathOut } from '@/paths';
import { initBrowserBundler } from '@/serve';
import { copyStaticFiles, transformFiles } from '@/transform';
import chokidar from 'chokidar';
import liveServer from 'live-server';
import fs from 'fs';

export const watch = async () => {
  let block = true;
  let liveServerRunning = false;
  const config = readConfig('./purplehaze.json');
  await preBuild(config);
  await copyStaticFiles(config);
  await initBrowserBundler({
    config,
  });
  await transformFiles({
    config,
  });
  if (!liveServerRunning) {
    liveServerRunning = true;
    liveServer.start({
      open: true,
      logLevel: 0,
      port: config.port,
      root: config.out,
      ...({ watch: [pathOut(config)('**/*.html')] } as any),
    });
  }
  chokidar
    .watch(`.env`, { interval: 10, ignoreInitial: true })
    .on('all', async (event, p) => {
      if (event !== 'add' && event !== 'change') {
        return;
      }
      if (isEnv(p)) {
        block = true;
        await transformFiles({ config });
        block = false;
      }
    });
  chokidar
    .watch(pathIn(config)(`**/*.{js,css,ts,tsx,jsx,md}`), {
      interval: 0, // No delay
      ignoreInitial: true,
    })
    .on('all', async (event, p) => {
      if (event !== 'add' && event !== 'change') {
        return;
      }
      if (isJSFile(p) || isTSFile(p) || isMd(p)) {
        if (block) {
          return;
        }

        if (fs.existsSync(p)) {
          block = true;
          await transformFiles({
            config,
            fileChanged: p,
          });
          block = false;
        }
        return;
      }
      if (isStaticFile(p)) {
        await copyStaticFiles(config);
      }
    });
  block = false;
  // `liveServer` local server for hot reload.
};

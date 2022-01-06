import { ConfigFile, readConfig } from '@/config';
import { initBrowserBundler } from '@/serve';
import {
  cleanBuild,
  generateBasicTypingsFiles,
  generateTypingsFiles,
  transformFiles,
  copyStaticFiles,
} from '@/transform';
import { regenerateTsConfig } from '@/transpilerConfig';
import { Utils } from 'graphql-zeus';

const transformHeaders = (headers?: { [x: string]: string }) => {
  if (!headers) {
    return undefined;
  }
  return Object.keys(headers).map((k) => `${k}:${headers[k]}`);
};

export const preBuild = async (config: ConfigFile) => {
  cleanBuild(config);
  regenerateTsConfig(config);
  await generateBasicTypingsFiles(config);
  if (config.graphql) {
    await Promise.all(
      Object.keys(config.graphql).map(async (k) => {
        const schema = await Utils.getFromUrl(
          config.graphql![k].url,
          transformHeaders(config.graphql![k].headers),
        );
        await generateTypingsFiles({ config, schema, name: k });
        return {
          schema,
          name: k,
        };
      }),
    );
  }
};

export const build = async () => {
  const config = readConfig('./purplehaze.json');
  await preBuild(config);
  const { close } = await initBrowserBundler({
    config,
  });
  await transformFiles({ config });
  copyStaticFiles(config);
  await close();
};

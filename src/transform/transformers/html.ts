import { ConfigFile } from '@/config';
import { message } from '@/console';
import { fileRegex, fileWriteRecuirsiveAsync } from '@/fsAddons';
import { pathIn, pathOut } from '@/paths';
import { bundle, Page } from '@/transform/module';
import fs from 'fs';

const writeHtmlFile = async ({
  config,
  name,
  code,
}: {
  name: string;
  config: ConfigFile;
  code?: {
    pages?: Page[];
    content?: string;
  };
}) => {
  const routes: Record<string, string> = {};
  if (code?.pages) {
    await Promise.all(
      code.pages.map(async (page) => {
        const route = [name, page.slug].join('/');
        routes[route] = `/${route}`;
        await fileWriteRecuirsiveAsync(
          pathOut(config)(name, page.slug + '.html'),
          page.body,
        );
      }),
    );
  }
  if (code?.content) {
    routes[name] = `/${name}`;
    await fileWriteRecuirsiveAsync(
      `${pathOut(config)(name)}.html`,
      code.content,
    );
  }
  return routes;
};

export const generateHtmlFiles = (config: ConfigFile) => async (
  jsFiles: string[],
) => {
  const htmlFiles = (
    await Promise.all(
      jsFiles.map((f) => injectHtmlFile({ fileToTransform: f, config })),
    )
  ).filter((f) => f.code);
  message(`Writing out ${htmlFiles.length} pages.`, 'yellow');
  const routes = (
    await Promise.all(htmlFiles.map((v) => writeHtmlFile({ config, ...v })))
  ).reduce((a, b) => {
    a = {
      ...a,
      ...b,
    };
    return a;
  });
  return routes;
};

export const injectHtmlFile = async ({
  fileToTransform,
  config,
}: {
  fileToTransform: string;
  config: ConfigFile;
}) => {
  const cssFile = hasTwinFile(fileToTransform, config, 'css');
  return {
    name: createTwinFile(fileToTransform),
    code: await bundle({
      name: fileToTransform,
      config: config,
      css: cssFile,
    }),
  };
};
export const createTwinFile = (fileToTransform: string, extension?: string) => {
  const regexResult = fileToTransform.match(fileRegex);
  if (!regexResult) {
    throw new Error(
      'Invalid file provided to function. Only accepting files matching mock regex',
    );
  }
  const twinFileName = extension
    ? `${regexResult[1]}.${extension}`
    : regexResult[1];
  return twinFileName;
};

export const hasTwinFile = (
  fileToTransform: string,
  config: ConfigFile,
  extension: string,
) => {
  let twinFile: string | undefined;
  const twinFileName = createTwinFile(fileToTransform, extension);
  const hasCorrespondingTwinFile = fs.existsSync(pathIn(config)(twinFileName));
  if (hasCorrespondingTwinFile) {
    twinFile = twinFileName;
  }
  return twinFile;
};

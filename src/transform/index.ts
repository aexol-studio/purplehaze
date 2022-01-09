import fs from 'fs';
import path from 'path';
import { bundle } from '@/transform/module';
import { ConfigFile } from '@/config';
import { GenerateGlobalTypings } from '@/transform/fn';
import { calcTime, message } from '@/console';
import { downloadTypings } from '@/typeFetcher';
import {
  fileWriteRecuirsiveAsync,
  isDirectory,
  isJSFile,
  isStaticFile,
  isTSFile,
  fileRegex,
  isMd,
} from '@/fsAddons';
import { pathGenerated, pathIn, pathOut, pathSsg } from '@/paths';
import { transformMarkdownFiles } from '@/transform/transformers/markdown';
import { transformTsx } from '@/transform/transformers/tsx';
import { envTransformer } from '@/transform/transformers/env';
import { PATH_GENERATED } from '@/constants';

const getFiles = (dir: string) => {
  const result = [];

  const files = [dir];
  do {
    const filepath = files.pop()!;
    const stat = fs.lstatSync(filepath);
    if (stat.isDirectory()) {
      fs.readdirSync(filepath).forEach((f) =>
        files.push(path.join(filepath, f)),
      );
    } else if (stat.isFile()) {
      result.push(path.relative(dir, filepath));
    }
  } while (files.length !== 0);

  return result;
};
export const readFiles = (matchFunction: (p: string) => boolean) => async (
  p: string,
) => {
  const allFiles: string[] = [];
  for await (const f of getFiles(p)) {
    const t = f as string;
    if (matchFunction(t)) {
      allFiles.push(t);
    }
  }
  return allFiles;
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

export const generateBasicTypingsFiles = async (config: ConfigFile) => {
  await envTransformer(config);
};

export const generateTypingsFiles = async ({
  name,
  schema,
  config,
}: {
  name: string;
  schema: string;
  config: ConfigFile;
}) => {
  const typings = await GenerateGlobalTypings({
    config,
    schema,
  });
  const ssgPath = pathSsg(config);
  await fileWriteRecuirsiveAsync(ssgPath(name, 'index.ts'), typings);
};

export const transformFiles = async ({ config }: { config: ConfigFile }) => {
  const { end } = calcTime('Build time', 'blueBright');
  const mdFiles = await readFiles(isMd)(config.in);
  if (mdFiles.length > 0) {
    await transformMarkdownFiles(config)(mdFiles);
  }

  const tsFiles = await readFiles(isTSFile)(config.in);
  if (tsFiles.length > 0) {
    await transformTsx(config)(tsFiles);
  }

  const jsFiles = await readFiles(isJSFile)(PATH_GENERATED);

  const rf = await Promise.all(
    jsFiles.map(async (f) => ({
      name: f,
      path: pathOut(config)(f),
      content: await fs.promises.readFile(pathGenerated(f)),
    })),
  );

  await Promise.all(
    rf.map(async (outFile) =>
      fileWriteRecuirsiveAsync(outFile.path, outFile.content),
    ),
  );
  await downloadTypings(
    config,
    rf.map((r) => r.content.toString('utf-8')),
  );
  message('Sending code to browser', 'yellowBright');
  await generateHtmlFiles(config)(jsFiles);
  message('Code render successful', 'greenBright');
  end();
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
  await Promise.all(
    htmlFiles.map(async ({ name, code }) => {
      if (code?.pages) {
        await Promise.all(
          code.pages.map(async (page) => {
            await fileWriteRecuirsiveAsync(
              pathOut(config)(name, page.slug + '.html'),
              page.body,
            );
          }),
        );
        return;
      }
      if (code?.content) {
        await fileWriteRecuirsiveAsync(
          `${pathOut(config)(name)}.html`,
          code.content,
        );
      }
    }),
  );
};

export const copyFile = (config: ConfigFile) => async (
  relativeFilePath: string,
) => {
  const f = await fs.promises.readFile(pathIn(config)(relativeFilePath));
  await fileWriteRecuirsiveAsync(pathOut(config)(relativeFilePath), f);
};

export const copyStaticFiles = async (config: ConfigFile) => {
  const files = getFiles(config.in);
  await Promise.all(
    files
      .filter((f) => !isDirectory(pathIn(config)(f)))
      .filter(isStaticFile)
      .map((f) => copyFile(config)(f)),
  );
};

export const cleanBuild = (config: ConfigFile) => {
  if (fs.existsSync(config.out)) {
    fs.rmSync(config.out, { recursive: true });
  }
};

import fs from 'fs';
import path from 'path';
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
  isMd,
} from '@/fsAddons';
import { pathGenerated, pathIn, pathOut, pathSsg } from '@/paths';
import { transformMarkdownFiles } from '@/transform/transformers/markdown';
import { transformTsx } from '@/transform/transformers/tsx';
import { envTransformer } from '@/transform/transformers/env';
import { PATH_GENERATED } from '@/constants';
import { transformRoutes } from '@/transform/transformers/route';
import { generateHtmlFiles } from '@/transform/transformers/html';

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

export const transformFiles = async ({
  config,
  fileChanged,
}: {
  config: ConfigFile;
  fileChanged?: string;
}) => {
  const { end } = calcTime('Build time', 'blueBright');

  const mdFiles = await readFiles(isMd)(config.in);
  await transformMarkdownFiles(config)(mdFiles);

  const tsFiles = await readFiles(isTSFile)(config.in);
  await transformTsx(config)(tsFiles);

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
  const routes = await generateHtmlFiles(config)(
    await readFiles(isJSFile)(PATH_GENERATED),
  );
  message('Generating routes', 'yellowBright');
  await transformRoutes(config, routes);
  message('Code render successful', 'greenBright');
  end();
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

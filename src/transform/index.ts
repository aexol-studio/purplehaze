import fs from 'fs';
import path from 'path';
import { bundle } from '@/transform/module';
import { ConfigFile } from '@/config';
import {
  GenerateGlobalTypings,
  md,
  basicFunctions,
  envsTypings,
} from '@/transform/fn';
import { message } from '@/console';
import { downloadTypings } from '@/typeFetcher';
import matter from 'gray-matter';
import {
  fileWriteRecuirsiveSync,
  isDirectory,
  isJSFile,
  isStaticFile,
  isTSFile,
  fileRegex,
  isMd,
} from '@/fsAddons';
import ts from 'typescript';
import { transform } from 'esbuild';
import { pathIn, pathOut, pathSsg } from '@/paths';

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
  const ssgPath = pathSsg(config);
  fileWriteRecuirsiveSync(ssgPath('md.js'), md.code);
  fileWriteRecuirsiveSync(ssgPath('md.d.ts'), md.typings);
  fileWriteRecuirsiveSync(ssgPath('basic.js'), basicFunctions.code);
  fileWriteRecuirsiveSync(ssgPath('basic.d.ts'), basicFunctions.typings);

  fileWriteRecuirsiveSync(
    pathIn(config)('purplehaze.d.ts'),
    envsTypings(config),
  );
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
  fileWriteRecuirsiveSync(ssgPath('index.ts'), typings);
};

export const transformFiles = async ({ config }: { config: ConfigFile }) => {
  const ssgPath = pathSsg(config);
  const mdFiles = await readFiles(isMd)(config.in);
  if (mdFiles.length > 0) {
    const generatedMdLib: Record<
      string,
      Pick<ReturnType<typeof matter>, 'content' | 'data' | 'excerpt'>
    > = {};
    try {
      await Promise.all(
        mdFiles.map(async (mdFile) => {
          const m = matter(fs.readFileSync(pathIn(config)(mdFile)));
          generatedMdLib[mdFile] = {
            content: m.content,
            data: m.data,
            excerpt: m.excerpt,
          };
        }),
      );
    } catch (error) {
      if (error instanceof Error) {
        message(error.message, 'red');
      }
      return;
    }
    fileWriteRecuirsiveSync(
      ssgPath('markdown.ts'),
      `export const htmlContent = ${JSON.stringify(
        generatedMdLib,
        null,
        4,
      )} as const`,
    );
  }
  const tsFiles = await readFiles(isTSFile)(config.in);
  if (tsFiles.length > 0) {
    const tsconfig = JSON.parse(
      fs.readFileSync('./tsconfig.json').toString('utf-8'),
    );
    try {
      await Promise.all(
        tsFiles.map(async (tsFile) => {
          const transpiled = await transpileTS(
            fs.readFileSync(pathIn(config)(tsFile)).toString('utf-8'),
            tsFile.endsWith('tsx') ? 'tsx' : 'ts',
            tsconfig,
          );
          const jsFileName = pathIn(config)(tsFile.replace(/\.tsx?$/, '.js'));
          fileWriteRecuirsiveSync(jsFileName, transpiled.code);
        }),
      );
    } catch (error) {
      if (error instanceof Error) {
        message(error.message, 'red');
      }
      return;
    }
  }
  const files = await readFiles(isJSFile)(config.in);
  message('Sending code to browser', 'yellowBright');
  const htmlFiles = (
    await Promise.all(
      files.map((f) => injectHtmlFile({ fileToTransform: f, config })),
    )
  ).filter((f) => f.code);
  message('Code render successful', 'greenBright');
  const rf = files.map((f) => ({
    name: f,
    path: pathOut(config)(f),
    content: fs.readFileSync(pathIn(config)(f)),
  }));
  await downloadTypings(
    config,
    rf.map((r) => r.content.toString('utf-8')),
  );
  message(`Writing out ${rf.length} files.`, 'yellow');
  rf.forEach((f) => {
    fileWriteRecuirsiveSync(pathOut(config)(f.name), f.content);
  });
  message(`Writing out ${htmlFiles.length} pages.`, 'yellow');
  htmlFiles.forEach(({ name, code }) => {
    if (code?.pages) {
      code.pages.forEach((page) => {
        fileWriteRecuirsiveSync(
          pathOut(config)(name, page.slug + '.html'),
          page.body,
        );
      });
      return;
    }
    if (code?.content) {
      fileWriteRecuirsiveSync(`${pathOut(config)(name)}.html`, code.content);
    }
  });
};

export const copyFile = (config: ConfigFile) => (relativeFilePath: string) => {
  fileWriteRecuirsiveSync(
    pathOut(config)(relativeFilePath),
    fs.readFileSync(pathIn(config)(relativeFilePath)),
  );
};

export const copyStaticFiles = (config: ConfigFile) => {
  const files = getFiles(config.in);
  files
    .filter((f) => !isDirectory(pathIn(config)(f)))
    .filter(isStaticFile)
    .forEach((f) => {
      copyFile(config)(f);
    });
};

export const cleanBuild = (config: ConfigFile) => {
  if (fs.existsSync(config.out)) {
    fs.rmSync(config.out, { recursive: true });
  }
};

export const transpileTS = (
  code: string,
  loader: 'ts' | 'tsx',
  options: ts.TranspileOptions,
) => {
  return transform(code, {
    tsconfigRaw: JSON.stringify(options),
    loader,
    format: 'esm',
  });
};

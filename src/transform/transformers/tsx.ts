import { ConfigFile } from '@/config';
import ts from 'typescript';
import { transform } from 'esbuild';
import { message } from '@/console';
import { fileWriteRecuirsiveSync } from '@/fsAddons';
import { pathGenerated, pathIn } from '@/paths';
import fs from 'fs';

export const transformTsx = (config: ConfigFile) => async (
  tsFiles: string[],
) => {
  const tsconfig = JSON.parse(
    fs.readFileSync('./tsconfig.json').toString('utf-8'),
  );
  try {
    return Promise.all(
      tsFiles.map(async (tsFile) => {
        const transpiled = await transpileTS(
          fs.readFileSync(pathIn(config)(tsFile)).toString('utf-8'),
          tsFile.endsWith('tsx') ? 'tsx' : 'ts',
          tsconfig,
        );
        const newJsFile = tsFile.replace(/\.tsx?$/, '.js');
        const jsFileName = pathGenerated(newJsFile);
        fileWriteRecuirsiveSync(jsFileName, transpiled.code);
        return newJsFile;
      }),
    );
  } catch (error) {
    if (error instanceof Error) {
      message(error.message, 'red');
    }
    return;
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

// .default .react default

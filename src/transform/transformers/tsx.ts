import { ConfigFile } from '@/config';
import { build } from 'esbuild';
import { message } from '@/console';
import { pathGenerated, pathIn } from '@/paths';

export const transformTsx = (config: ConfigFile) => async (
  tsFiles: string[],
) => {
  try {
    return Promise.all(
      tsFiles.map(async (tsFile) => {
        const isReact = tsFile.endsWith('x');
        const newJsFile = tsFile.replace(/x$/, '').replace(/\.ts$/, '.js');
        const jsFileName = pathGenerated(newJsFile);

        const fileToTranspilePath = pathIn(config)(tsFile);
        await transpileTS(
          fileToTranspilePath,
          jsFileName,
          isReact ? 'tsx' : 'ts',
          './tsconfig.json',
        );
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
  filePath: string,
  outfile: string,
  loader: 'ts' | 'tsx',
  options: string,
) => {
  return build({
    entryPoints: [filePath],
    outfile,
    tsconfig: options,
    loader: {
      '.ts': loader,
      '.tsx': loader,
      '.js': loader,
      '.jsx': loader,
    },
    format: 'esm',
    bundle: true,
    plugins: [
      {
        name: 'resolve-ts-to-js',
        setup(build) {
          build.onResolve({ filter: /.*/ }, (args) => {
            if (args.kind === 'entry-point') return;
            let path = args.path;
            if (!path.endsWith('.js') && !path.startsWith('http'))
              path += '.js';
            return { path, external: true };
          });
        },
      },
    ],
  });
};

// .default .react default

import { ConfigFile } from '@/config';
import { existsJSONOrDefaultSync } from '@/fsAddons';
import fs from 'fs';

export const TSConfig = () => ({
  compilerOptions: {
    incremental: true /* Enable incremental compilation */,
    target:
      'esnext' /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */,
    module:
      'ES2020' /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */,
    strict: true /* Enable all strict type-checking options. */,
    esModuleInterop: true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */,
    skipLibCheck: true /* Skip type checking of declaration files. */,
    forceConsistentCasingInFileNames: true /* Disallow inconsistently-cased references to the same file. */,
    allowJs: true,
    noEmit: true,
    baseUrl: '' /* leave or change to ./ for url imports to work */,
  },
});

export const getTsConfig = (config: ConfigFile) =>
  existsJSONOrDefaultSync('./tsconfig.json', TSConfig());

export const regenerateTsConfig = (config: ConfigFile) => {
  updateTSConfig(config, (oldConfig) => {
    return {
      ...oldConfig,
      include: [
        `${config.in}/**/*.tsx`,
        `${config.in}/**/*.jsx`,
        `${config.in}/**/*.ts`,
        `${config.in}/**/*.js`,
        `${config.in}/purplehaze.d.ts`,
      ],
    };
  });
};

export const updateTSConfig = (
  config: ConfigFile,
  fn: (config: any) => any,
) => {
  fs.writeFileSync(
    './tsconfig.json',
    JSON.stringify(fn(getTsConfig(config)), null, 2),
  );
};

import fs from 'fs';
import path from 'path';

export const fileRegex = /(.*)\.js$/;
const typescriptFileRegex = /(.*)\.(tsx?|jsx?)$/;
const typingsRegex = /(.*)\.d\.ts$/;
const cssRegex = /(.*)\.css$/;
const mdRegex = /(.*)\.md$/;
const envRegex = /^\.env/;

export const isJSFile = (p: string) => !!p.match(fileRegex);
export const isTypingsFile = (p: string) => !!p.match(typingsRegex);
export const isTSFile = (p: string) =>
  !!p.match(typescriptFileRegex) && !isTypingsFile(p);
export const isTransformableFile = (p: string) =>
  !!p.match(typescriptFileRegex) && !isTypingsFile(p);
export const isCss = (p: string) => !!p.match(cssRegex);
export const isMd = (p: string) => !!p.match(mdRegex);
export const isEnv = (p: string) => !!p.match(envRegex);
export const isDirectory = (p: string) => fs.statSync(p).isDirectory();

export const mayBeIndexFileOrWithoutExtension = (p: string) => {
  if (p.includes('.')) {
    return !p
      .split('.')
      .pop()!
      .match(/[^\/]*/gm);
  }
  return !p.match(/\/$/);
};

export const getPossibleFilePaths = (p: string) =>
  [
    '.ts',
    '.tsx',
    '.js',
    '.jsx',
    '/index.ts',
    '/index.tsx',
    '/index.js',
    '/index.jsx',
  ].map((e) => `${p}${e}`);
export const isStaticFile = (p: string) =>
  !isJSFile(p) && !isTypingsFile(p) && !isTSFile(p) && !isMd(p) && !isEnv(p);

export const mkFileDirSync = (p: string) => {
  const dir = path.dirname(p);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export const existsJSONOrDefaultSync = (p: string, defaultValue: any) =>
  fs.existsSync(p)
    ? JSON.parse(fs.readFileSync(p).toString('utf-8'))
    : defaultValue;

export const fileWriteRecuirsiveSync = (
  p: string,
  data: string | NodeJS.ArrayBufferView,
) => {
  mkFileDirSync(p);
  fs.writeFileSync(p, data);
};

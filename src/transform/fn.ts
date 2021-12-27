import { TreeToTS } from 'graphql-zeus';
import { Parser } from 'graphql-js-tree';
import { parse } from 'dotenv';
import fs from 'fs';
// @ts-ignore
import { Remarkable } from 'remarkable';
import fetch from 'node-fetch';
import { ConfigFile } from '@/config';
import { objectToType } from '@/transform/objectToType';

export interface DryadFunctionResult {
  body: string;
  script: string;
}
export interface DryadFunctionFunction {
  (
    remarkableRenderer: (markdownString: string) => string,
    f: typeof fetch,
  ): Promise<DryadFunctionResult>;
}

export const md = {
  code: `
import {Remarkable} from 'https://cdn.skypack.dev/remarkable';
const remarkableRenderer = new Remarkable()
export const md = (strings, ...expr) => {
  let str = '';
  strings.forEach((string, i) => {
      str += string + (expr[i] || '');
  });
  return remarkableRenderer.render(str);
}`,
  typings: `export declare const md: (strings: TemplateStringsArray, ...expr: string[]) => string`,
};

export const basicFunctions = {
  code: `
  export const html =  (strings, ...expr) => {
    let str = '';
    strings.forEach((string, i) => {
        str += string + (expr[i] || '');
    });
    return str;
  }
  export const css =  (strings, ...expr) => {
    let str = '';
    strings.forEach((string, i) => {
        str += string + (expr[i] || '');
    });
    return str;
  }
`,
  typings: `export declare const html: (strings: TemplateStringsArray, ...expr: string[]) => string
export declare const css: (strings: TemplateStringsArray, ...expr: string[]) => string`,
};
export const envsTypings = (config: ConfigFile) => {
  const envs = fs.existsSync('./.env')
    ? parse(fs.readFileSync('./.env'))
    : undefined;
  const ssg = {
    envs,
    config,
  };
  return `
declare const ssg: ${objectToType(ssg)}`;
};

export const GenerateGlobalTypings = ({
  schema,
  config,
}: {
  schema: string;
  config: ConfigFile;
}) => {
  const graphqlTree = Parser.parse(schema);
  return TreeToTS.resolveTree({ tree: graphqlTree, env: 'browser' });
};

import { TreeToTS } from 'graphql-zeus';
import { Parser } from 'graphql-js-tree';
// @ts-ignore
import { Remarkable } from 'remarkable';
import fetch from 'node-fetch';
import { ConfigFile } from '@/config';
import { objectToType } from '@/transform/objectToType';
import { envLoader } from '@/loaders/env';

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

export const envsTypings = (config: ConfigFile) => {
  const envs = envLoader();
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

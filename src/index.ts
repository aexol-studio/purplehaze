#!/usr/bin/env node
import { ConfigFile, GLOBAL_CONFIG_FILE } from './config';
export const getInitialConfig = ({
  graphql,
}: Pick<ConfigFile, 'graphql'>): ConfigFile => {
  return {
    ...GLOBAL_CONFIG_FILE,
    graphql,
  };
};

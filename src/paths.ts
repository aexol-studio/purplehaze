import { ConfigFile } from '@/config';
import { PATH_GENERATED } from '@/constants';
import path from 'path';
export const pathIn = (config: ConfigFile) => (...args: string[]) =>
  path.join(config.in, ...args);

export const pathOut = (config: ConfigFile) => (...args: string[]) =>
  path.join(config.out, ...args);

export const pathSsg = (config: ConfigFile) => (...args: string[]) =>
  pathIn(config)('ssg', ...args);

export const pathGenerated = (...args: string[]) =>
  path.join(PATH_GENERATED, ...args);

export const pathGeneratedSsg = (...args: string[]) =>
  pathGenerated('ssg', ...args);

export const pathGeneratedTypings = (...args: string[]) =>
  pathGenerated('typings', ...args);

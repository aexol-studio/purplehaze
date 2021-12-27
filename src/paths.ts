import { ConfigFile } from '@/config';
import path from 'path';
export const pathIn = (config: ConfigFile) => (...args: string[]) =>
  path.join(config.in, ...args);

export const pathOut = (config: ConfigFile) => (...args: string[]) =>
  path.join(config.out, ...args);

export const pathSsg = (config: ConfigFile) => (...args: string[]) =>
  pathIn(config)('ssg', ...args);

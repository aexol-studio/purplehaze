import { parse } from 'dotenv';
import fs from 'fs';
export const envLoader = () => {
  const systemEnvs = Object.fromEntries(
    Object.entries(process.env).filter(([k, v]) => k[0].toUpperCase() === k[0]),
  );
  const fileEnvs = fs.existsSync('./.env')
    ? parse(fs.readFileSync('./.env'))
    : {};
  const allEnvs = {
    ...systemEnvs,
    ...fileEnvs,
  };
  return allEnvs;
};

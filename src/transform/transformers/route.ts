import { ConfigFile } from '@/config';
import { fileWriteRecuirsiveIfContentDifferent } from '@/fsAddons';
import { pathSsg } from '@/paths';

export const transformRoutes = async (
  config: ConfigFile,
  routes: Record<string, string>,
) => {
  const routeFilePath = pathSsg(config)('routes.ts');
  await fileWriteRecuirsiveIfContentDifferent(
    routeFilePath,
    `export const routes = ${JSON.stringify(routes, null, 4)} as const`,
  );
};

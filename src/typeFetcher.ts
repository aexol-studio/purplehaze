import fetch from 'node-fetch';
import { ConfigFile } from '@/config';
import { message } from '@/console';
import { fileWriteRecuirsiveAsync } from '@/fsAddons';
import { getTsConfig, updateTSConfig } from '@/transpilerConfig';
import { pathGeneratedTypings } from '@/paths';
import fs from 'fs';

const URL_REGEX = new RegExp(/^import.*(https:\/\/.*)\/(.*)['|"]/gm);

interface PackageDetails {
  packageName: string;
  url: string;
}

export const parseDocumentToFindPackages = (content: string) => {
  return [...content.matchAll(URL_REGEX)]
    .filter((m) => m.length > 1)
    .map((m) => ({
      packageName: m[2],
      url: m[1],
    }));
};

export const constructTypingsDefsUrl = ({
  packageName,
  baseUrl,
}: {
  packageName: string;
  baseUrl: string;
}) => `${baseUrl}/@types/${packageName}/index.d.ts`;

export const constructTypingsUrl = ({
  packageName,
  baseUrl,
  typingsPath,
}: {
  packageName: string;
  baseUrl: string;
  typingsPath: string;
}) => `${baseUrl}/${packageName}/${typingsPath}`;

export const fetchTypingsForUrl = async (url: string) => {
  const module = await fetch(url).then((r) => {
    if (r.status === 404) {
      return;
    }
    return r.text();
  });
  return module;
};

export const mergePackages = (filesContent: string[]) => {
  return filesContent
    .map(parseDocumentToFindPackages)
    .reduce<Array<PackageDetails>>((a, b) => {
      b.forEach((p) => {
        if (
          !a.find(
            (alreadyInArray) => alreadyInArray.packageName === p.packageName,
          )
        ) {
          a.push(p);
        }
      });
      return a;
    }, []);
};

export const fetchTypings = async (packages: PackageDetails[]) => {
  if (packages.length === 0) {
    return [];
  }
  message(
    'Starting streaming types for packages: ' +
      packages.map((p) => p.packageName).join(', '),
    'blueBright',
  );
  const packagesWithTypings = await Promise.all(
    packages.map(async (p) => {
      let lookForTypings = await fetchTypingsForUrl(
        constructTypingsUrl({
          baseUrl: p.url,
          packageName: p.packageName,
          typingsPath: 'types/index.d.ts',
        }),
      );
      lookForTypings =
        lookForTypings ||
        (await fetchTypingsForUrl(
          constructTypingsDefsUrl({
            baseUrl: p.url,
            packageName: p.packageName,
          }),
        ));
      if (!lookForTypings) {
        message(
          `Can't find typings on "${p.packageName}" Package will remain untyped`,
          'redBright',
        );
      }
      return {
        p,
        typings: lookForTypings,
      };
    }),
  );
  message('Successfully fetched the types', 'greenBright');
  return packagesWithTypings.filter((p) => p.typings) as Array<{
    p: PackageDetails;
    typings: string;
  }>;
};

export const downloadTypings = async (
  configFile: ConfigFile,
  filesContent: string[],
) => {
  const compilerConfig = getTsConfig(configFile);
  const packages = mergePackages(filesContent).filter((p) => {
    const packagePath = `${p.url}/${p.packageName}`;
    const pathExist = !!compilerConfig.compilerOptions?.paths?.[packagePath];
    if (!pathExist) {
      return true;
    }
    const typingsExist = fs.existsSync(
      pathGeneratedTypings(p.packageName, 'index.d.ts'),
    );
    if (!typingsExist) {
      return true;
    }
    return false;
  });
  const ts = await fetchTypings(packages);
  const paths: Record<string, string[]> = {};
  await Promise.all(
    ts.map(async (t) => {
      const typingsPath = pathGeneratedTypings(t.p.packageName, 'index.d.ts');
      message(`Installing typings for "${t.p.packageName}"`, 'yellowBright');
      await fileWriteRecuirsiveAsync(typingsPath, t.typings);
      paths[`${t.p.url}/${t.p.packageName}`] = [typingsPath];
    }),
  );
  updateTSConfig(configFile, (tsConfig) => {
    return {
      ...tsConfig,
      compilerOptions: {
        ...(tsConfig.compilerOptions || {}),
        paths: {
          ...(tsConfig.compilerOptions?.paths || {}),
          ...paths,
        },
      },
    };
  });
  return;
};

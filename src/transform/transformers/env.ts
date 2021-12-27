import { ConfigFile } from '@/config';
import { fileWriteRecuirsiveSync } from '@/fsAddons';
import { pathIn } from '@/paths';
import { envsTypings } from '@/transform/fn';

export const envTransformer = (config: ConfigFile) => {
  fileWriteRecuirsiveSync(
    pathIn(config)('purplehaze.d.ts'),
    envsTypings(config),
  );
};

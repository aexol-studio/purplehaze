import { ConfigFile } from '@/config';
import { fileWriteRecuirsiveAsync } from '@/fsAddons';
import { pathIn } from '@/paths';
import { envsTypings } from '@/transform/fn';

export const envTransformer = (config: ConfigFile) =>
  fileWriteRecuirsiveAsync(
    pathIn(config)('purplehaze.d.ts'),
    envsTypings(config),
  );

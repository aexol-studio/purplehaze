import { message } from '@/console';
import { fileWriteRecuirsiveAsync } from '@/fsAddons';
import { pathIn, pathSsg } from '@/paths';
import matter from 'gray-matter';
import fs from 'fs';
import { ConfigFile } from '@/config';

export const transformMarkdownFiles = (config: ConfigFile) => async (
  mdFiles: string[],
) => {
  const generatedMdLib: Record<
    string,
    Pick<ReturnType<typeof matter>, 'content' | 'data' | 'excerpt'>
  > = {};
  try {
    await Promise.all(
      mdFiles.map(async (mdFile) => {
        const m = matter(await fs.promises.readFile(pathIn(config)(mdFile)));
        generatedMdLib[mdFile] = {
          content: m.content,
          data: m.data,
          excerpt: m.excerpt,
        };
      }),
    );
  } catch (error) {
    if (error instanceof Error) {
      message(error.message, 'red');
    }
    return;
  }
  await fileWriteRecuirsiveAsync(
    pathSsg(config)('markdown.ts'),
    `export const htmlContent = ${JSON.stringify(
      generatedMdLib,
      null,
      4,
    )} as const`,
  );
};

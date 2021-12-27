import { htmlContent } from 'src/ssg/markdown';

export const routes = <
  Z extends Record<
    string,
    {
      data: {
        title: string;
        link: string;
      };
    }
  >
>(
  htmlContent: Z,
) =>
  Object.entries(htmlContent)
    .filter(([, v]) => !!v.data.title)
    .map(([k, v]) => ({
      link: v.data.link,
      title: v.data.title,
    }));

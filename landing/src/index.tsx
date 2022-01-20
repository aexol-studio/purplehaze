import React from 'https://cdn.skypack.dev/react';
import { htmlContent } from './ssg/markdown';
import { Layout } from './Layout/index';
import { routes } from './markdownRoutes';
import { renderMarkdown } from './mdtransform';

export default (data: DataType) => {
  return (
    <Layout version={data.version} prefix={data.prefix} routes={data.routes}>
      <div
        className="prose prose-lg"
        dangerouslySetInnerHTML={{
          __html: renderMarkdown.render(data.content.content),
        }}
      ></div>
    </Layout>
  );
};

export const data = () => {
  return {
    content: htmlContent['markdown/index.md'],
    routes: routes(htmlContent),
    prefix: ssg.envs.PATH_PREFIX,
    version: ssg.envs.VERSION,
  };
};

export const head = (data: DataType) => {
  return (
    <>
      <link rel="stylesheet" href="./tw.css" />
      <title>Purple haze docs {data.version}</title>
    </>
  );
};

type DataType = ReturnType<typeof data>;

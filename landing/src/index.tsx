import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import { md } from './ssg/md.js';

import { htmlContent } from './ssg/markdown.js';
import { Layout } from './Layout.js';
import { html } from './ssg/basic.js';
import { routes } from './markdownRoutes.js';

const IndexPage: React.FC<{ data: DataType }> = ({ data }) => {
  return (
    <Layout prefix={data.prefix} routes={data.routes}>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: md`${data.content.content}` }}
      ></div>
    </Layout>
  );
};

export const data = () => {
  return {
    content: htmlContent['markdown/index.md'],
    routes: routes(htmlContent),
    prefix: ssg.envs.PATH_PREFIX,
  };
};

export const head = () => {
  return html`
    <link rel="stylesheet" href="./tw.css" />
    <title>Purple haze docs</title>
  `;
};

type DataType = ReturnType<typeof data>;

export const hydrate = async (staticData: DataType) =>
  ReactDOM.hydrate(<IndexPage data={staticData} />, document.body);

export default async (staticData: DataType) => {
  const renderBody = document.createElement('div');
  ReactDOM.render(<IndexPage data={staticData} />, renderBody);
  return renderBody.innerHTML;
};

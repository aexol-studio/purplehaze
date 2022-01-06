import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import { htmlContent } from './ssg/markdown.js';
import { Layout } from './Layout.js';
import { routes } from './markdownRoutes.js';
import { renderMarkdown } from './mdtransform.js';

const CustomPage: React.FC<{
  data: {
    content: DataType['htmlContent'][keyof DataType['htmlContent']];
    routes: DataType['routes'];
    activeRoute?: string;
    prefix?: string;
  };
}> = ({ data }) => {
  return (
    <Layout
      prefix={data.prefix}
      activeRoute={data.activeRoute}
      routes={data.routes}
    >
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
    htmlContent,
    routes: routes(htmlContent),
    prefix: ssg.envs.PATH_PREFIX,
  };
};

type DataType = ReturnType<typeof data>;

export const hydrate = async (staticData: {
  content: DataType['htmlContent'][keyof DataType['htmlContent']];
  routes: DataType['routes'];
  activeRoute?: string;
  prefix?: string;
}) => ReactDOM.hydrate(<CustomPage data={staticData} />, document.body);

export const pages = async (staticData: DataType) => {
  return await Promise.all(
    Object.entries(staticData.htmlContent)
      .filter(([, v]) => !!v.data.link)
      .map(async ([k, v], i) => {
        const renderBody = document.createElement('div');
        ReactDOM.render(
          <CustomPage
            data={{
              content: v,
              routes: routes(staticData.htmlContent),
              activeRoute: v.data.link,
              prefix: staticData.prefix,
            }}
          />,
          renderBody,
        );
        return {
          body: renderBody.innerHTML,
          data: {
            content: v,
            routes: routes(staticData.htmlContent),
            activeRoute: v.data.link,
            prefix: staticData.prefix,
          },
          slug: v.data.link,
          head: `
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.2.0/build/styles/github-dark.min.css"
            />
            <link rel="stylesheet" href="../tw.css" />
            <title>Purple haze docs</title>
          `,
        };
      }),
  );
};

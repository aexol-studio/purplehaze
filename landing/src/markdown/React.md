---
link: react
title: React
order: 6
---

To use `purplehaze` with `React` normally export a component as a default function consuming `data` function result. You can also return `React` component from head function

```tsx
import React from 'https://cdn.skypack.dev/react';
import { htmlContent } from './ssg/markdown';
import { Layout } from './Layout';
import { routes } from './markdownRoutes';
import { renderMarkdown } from './mdtransform';

export default (data: DataType) => {
  return (
    <Layout prefix={data.prefix} routes={data.routes}>
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
  };
};

export const head = () => {
  return (
    <>
      <link rel="stylesheet" href="./tw.css" />
      <title>Purple haze docs</title>
    </>
  );
};

type DataType = ReturnType<typeof data>;
```

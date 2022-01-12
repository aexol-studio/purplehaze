---
title: Routes
link: routes
order: 1.1
---

Routes is a file generated for type safe routing inside ssg. It will generate routes for all the files containing `default` and `pages` export

```ts
export const routes = {
  'page/routes': '/page/routes',
  'page/react': '/page/react',
  'page/pages': '/page/pages',
  'page/import-from-url': '/page/import-from-url',
  'page/markdown': '/page/markdown',
  'page/graphql': '/page/graphql',
  'page/env-variables': '/page/env-variables',
  'page/configuration': '/page/configuration',
  'page/changelog': '/page/changelog',
  index: '/index',
} as const;
```

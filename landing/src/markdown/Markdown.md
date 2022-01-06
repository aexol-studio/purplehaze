---
title: Markdown
link: markdown
order: 5
---

Markdown files are automatically transformed to one `markdown.ts` file. You can use its content later one inside your `ts` components and pages.

```mdx
---
link: hello
---

# Hello world

Hello there
```

Will be transformed to

```ts
export const htmlContent = {
  'markdown/index.md': {
    content: '\n# Hello world\n\nHello there',
    data: {
      link: 'hello',
    },
    excerpt: '',
  },
};
```

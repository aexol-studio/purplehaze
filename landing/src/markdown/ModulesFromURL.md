---
title: Import from URL
link: import-from-url
order: 2
---

## Type Streaming

For example: If you use url that begins with `https://cdn.skypack.dev` in your import. It will try to fetch typings from skypack and save them in typings folder referencing to jsconfig. This should provide typings for example in VSCode.

```tsx
import React from 'https://cdn.skypack.dev/react';
```

So if the file contains url import `purplehaze` will fetch typings, add them to typings folder and tsconfig file for intellisense support.

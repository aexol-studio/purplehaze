---
title: Helpers
link: helpers
---

Purple haze comes with pregenerated helper functions for markdown and html

#### html

It doesnt transform html in any way, but gives you syntax coloring

```js
import { html } from './ssg/basic.js';
const ADiv = html`
  <div>Hello world</div>
`;
```

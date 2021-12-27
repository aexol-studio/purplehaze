---
link: how-it-works
title: How it works
---

### File must contain export default

String returned in contained in file export default is generated via SSG phase.

```js
import { html } from './ssg/basic.js';
export default () => {
  return html`
    <div>Hello world</div>
  `;
};
```

To have syntax coloring in html pleas install appropriate litelement extension for your IDE.

### Config

Config file can be generated or created manually. It should contain all the following values.

```json
{
  "graphql": {
    "feature-mole": {
      "url": "https://faker.graphqleditor.com/explore-projects/feature-mole/graphql"
    }
  },
  "in": "./pages",
  "out": "./out",
  "websocketPort": 1416,
  "port": 8082
}
```

#### Typescript

Turn on typescript support URL imports also works here. Of course you can still import relative modules.

```json
{
  "graphql": {
    "feature-mole": {
      "url": "https://faker.graphqleditor.com/explore-projects/feature-mole/graphql"
    }
  },
  "in": "./pages",
  "out": "./out",
  "websocketPort": 1416,
  "port": 8082,
  "mode": "typescript"
}
```

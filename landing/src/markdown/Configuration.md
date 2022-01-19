---
link: configuration
title: Configuration
order: 3
---

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

URL imports also work here. Of course you can still import relative modules.

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

#### Config Injection

Config file is injected and typed. It is available only inside `export default` and `export const head` function to prevent leaking of secrets.

Usage in JS example:

```js
const graphQLClient = Chain(ssg.config.HOST, {
  headers: {
    Authorization: `Bearer ${ssg.config.TOKEN}`,
  },
});
```

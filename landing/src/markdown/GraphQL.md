---
link: graphql
title: GraphQL
---

Works like fetch to GraphQL, where you need to provide host and/or options to receive fully Autocompleted client for schema url from your config.

```js
import { Chain } from './ssg/main-schema/index.js';
const graphQLClient = Chain(ssg.config.graphql['main-schema'].url);

const response = await graphQLClient.query({ people: true });
```

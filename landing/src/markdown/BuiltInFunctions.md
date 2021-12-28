---
title: Functions
link: functions
---

#### head

```js
import { html } from './ssg/basic.js';
export const head = () => html`<title>Hello world!</div>`;
```

#### data, hydrate

Data function is used for so called data hydration in JSX frameworks and others also. It is used for Static Site rendered websites to be able to consume the data and work on client side. So you need to handle both data and hydrate functions yourself so they can be executed on output script.

```tsx
// Create your app
export const data = async () => {
  const Fetch = Chain(ssg.config.graphql.pokemon.url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return Fetch.query({
    pokemons: [
      { first: 151 },
      {
        number: true,
        name: true,
        image: true,
        types: true,
        resistant: true,
        weaknesses: true,
      },
    ],
  });
};

type DataType = ReturnType<typeof data> extends Promise<infer R> ? R : never;

export const hydrate = async (staticData: DataType) =>
  ReactDOM.hydrate(<PokemonApp response={staticData} />, document.body);

export default async (staticData: DataType) => {
  const renderBody = document.createElement('div');
  ReactDOM.render(<PokemonApp response={staticData} />, renderBody);
  return renderBody.innerHTML;
};
```

#### pages

If you export pages function you can generate multiple pages per one file. This is useful for example for single blog post page. It takes

```tsx
export const data = async () => {
  const Fetch = Chain(ssg.config.graphql.pokemon.url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return Fetch.query({
    pokemons: [
      { first: 5 },
      {
        number: true,
        name: true,
        image: true,
        types: true,
        resistant: true,
        weaknesses: true,
      },
    ],
  });
};

type DataType = ReturnType<typeof data> extends Promise<infer R> ? R : never;

export const pages = (staticData: DataType) => {
  return staticData.pokemons?.map((p) => {
    const renderBody = document.createElement('div');
    ReactDOM.render(<PokemonApp {...p} />, renderBody);
    return {
      slug: p.name?.split(' ')[0],
      body: renderBody.innerHTML,
      data: p,
      head: html`
        <title>${p.name || ''}</title>
        <link href="../index.css" rel="stylesheet" type="text/css" />
      `,
    };
  });
};
```

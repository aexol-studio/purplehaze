# Purple haze

[![NPM Version](https://img.shields.io/npm/v/purplehaze.svg?style=flat)]()
![Build](https://github.com/aexol-studio/purplehaze/actions/workflows/release.yml/badge.svg)

Inspired by generative programming and weed :). So I was learning Elm language at home usually in the evening and now I am missing all this generative stuff from Elm libs in TS.

## What is generated?

- when you type **URL** of an esmodule typings are fetched in the background and typings generated locally for intellisense
- when you add **Markdown** files with gray matter it will generate typings for those
- when you add a **Page** it will generate Route types so you won't make a mistake later when routing to another page
- when you add **GraphQL** backends it will generate Zeus libraries for it making communication with GraphQL backend type safe
- when you modify **config** you can access type safe values from it during build ssg process
- when you add **env variables** you can access the record with all of them

It is the missing ingredient of Web Components architecture. Simple bundler for GraphQL based website using esmodules. What makes it unique? It uses browser for bundling (not node). Remember in ESModules you can use URL imports and relative imports. You can also provide importmap for other imports

## Installation

Install globally

```sh
npm i -g purplehaze
```

## How to use

Init a new project. This will create `purplehaze.json` in current directory. You don't need a `package.json` but you can add one for type completions.

```sh
purplehaze --init .
```

Set up config.

```json
{
  "graphql": {
    "pokemon": {
      "url": "https://graphql-pokemon2.vercel.app/"
    }
  },
  "in": "./pages",
  "out": "./out",
  "websocketPort": 1414,
  "port": 8080
}
```

So you need to provide your schema url ( you can declare multiple schemas ) ,in and out dirs for purplehaze

You can also add headers if needed:

```json
{
  "graphql": {
    "pokemon": {
      "url": "https://graphql-pokemon2.vercel.app/",
      "headers": {
        "Authorization": "Bearer MyToken"
      }
    }
  },
  "in": "./pages",
  "out": "./out",
  "websocketPort": 1414,
  "port": 8080
}
```

Watch

```sh
purplehaze
```

Build

```sh
purplehaze --build
```

## How it works?

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

### Environment variables

Environment variables must be put side by side to `purplehaze.json` in `.env` file.It is available only inside `export default` and `export const head` .

Usage in JS example:

```js
const graphQLClient = Chain(ssg.env.HOST, {
  headers: {
    Authorization: `Bearer ${ssg.env.TOKEN}`,
  },
});
```

It is available only inside `export default` and `export const head` function to prevent leaking of secrets.

### Injected built in helper code syntax functions

Purple haze comes with generated library

#### Chain

Works like fetch to GraphQL, where you need to provide host and/or options to receive fully Autocompleted client for schema url from your config.

```js
import { Chain } from './ssg/main-schema/index.js';
const graphQLClient = Chain(ssg.config.graphql['main-schema'].url);

const response = await graphQLClient.query({ people: true });
```

#### html

It doesnt transform html in any way, but gives you syntax coloring

```js
import { html } from './ssg/basic.js';
const ADiv = html`
  <div>Hello world</div>
`;
```

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

## Assets

You can use them as normally.

## Type Streaming

For example: If you use url that begins with `https://cdn.skypack.dev` in your import. It will try to fetch typings from skypack and save them in typings folder referencing to jsconfig. This should provide typings for example in VSCode.

## Roadmap

- [x] Add esbuild
- [x] Add TS support
- [x] Add intelligent .d.ts autocompletion for imported es modules
- [x] Add image supports
- [x] Generate tsconfig
- [x] Relative imports
- [x] Allow head modification
- [x] Pass env to browser
- [x] Provide a way to inject config
- [x] TSConfig generation for included declarations to work
- [x] Make zeus configurable and importable file
- [ ] Clear error handling with line numbers
- [x] split utility functions css,html,md from zeus
- [x] allow to auto-zeus multiple schemas
- [x] Types from url streaming
- [x] JSX, TSX support
- [ ] Provide verbose info levels
- [ ] Create docs and landing page deployable to pages
- [ ] Resolve imports with no extension
- [ ] catch esbuild transform errors
- [x] support files exporting multiple static pages
- [ ] Add possibility to override html tag
- [ ] Create static gray matter typings for .md files
- [ ] Generate Routes typings for existing export default files
- [ ] catch all errors including no network error

const htmlContent = {
  "markdown/index.md": {
    "content": "\n# \u{1F636}\u200D\u{1F32B}\uFE0F Purple haze\n\nInspired by generative programming and weed :). So I was learning Elm language at home usually in the evening and now I am missing all this generative stuff from Elm libs in TS.\n\n## What is generated?\n\n- when you type **URL** of an esmodule typings are fetched in the background and typings generated locally for intellisense\n- when you add **Markdown** files with gray matter it will generate typings for those\n- when you add a **Page** it will generate Route types so you won't make a mistake later when routing to another page\n- when you add **GraphQL** backends it will generate Zeus libraries for it making communication with GraphQL backend type safe\n- when you modify **config** you can access type safe values from it during build ssg process\n- when you add **env variables** you can access the record with all of them\n\nIt is the missing ingredient of Web Components architecture. Simple bundler for GraphQL based website using esmodules. What makes it unique? It uses browser for bundling (not node). Remember in ESModules you can use URL imports and relative imports. You can also provide importmap for other imports\n",
    "data": {
      "link": "",
      "title": ""
    },
    "excerpt": ""
  },
  "markdown/ModulesFromURL.md": {
    "content": "\n## Type Streaming\n\nFor example: If you use url that begins with `https://cdn.skypack.dev` in your import. It will try to fetch typings from skypack and save them in typings folder referencing to jsconfig. This should provide typings for example in VSCode.\n",
    "data": {
      "title": "Import from URL",
      "link": "import-from-url"
    },
    "excerpt": ""
  },
  "markdown/Installation.md": {
    "content": "\nInstall globally\n\n```sh\nnpm i -g purplehaze\n```\n",
    "data": {
      "link": "installation",
      "title": "Installation"
    },
    "excerpt": ""
  },
  "markdown/HowItWorks.md": {
    "content": '\n### File must contain export default\n\nString returned in contained in file export default is generated via SSG phase.\n\n```js\nimport { html } from \'./ssg/basic.js\';\nexport default () => {\n  return html`\n    <div>Hello world</div>\n  `;\n};\n```\n\nTo have syntax coloring in html pleas install appropriate litelement extension for your IDE.\n\n### Config\n\nConfig file can be generated or created manually. It should contain all the following values.\n\n```json\n{\n  "graphql": {\n    "feature-mole": {\n      "url": "https://faker.graphqleditor.com/explore-projects/feature-mole/graphql"\n    }\n  },\n  "in": "./pages",\n  "out": "./out",\n  "websocketPort": 1416,\n  "port": 8082\n}\n```\n\n#### Typescript\n\nTurn on typescript support URL imports also works here. Of course you can still import relative modules.\n\n```json\n{\n  "graphql": {\n    "feature-mole": {\n      "url": "https://faker.graphqleditor.com/explore-projects/feature-mole/graphql"\n    }\n  },\n  "in": "./pages",\n  "out": "./out",\n  "websocketPort": 1416,\n  "port": 8082,\n  "mode": "typescript"\n}\n```\n',
    "data": {
      "link": "how-it-works",
      "title": "How it works"
    },
    "excerpt": ""
  },
  "markdown/Helpers.md": {
    "content": "\nPurple haze comes with pregenerated helper functions for markdown and html\n\n#### html\n\nIt doesnt transform html in any way, but gives you syntax coloring\n\n```js\nimport { html } from './ssg/basic.js';\nconst ADiv = html`\n  <div>Hello world</div>\n`;\n```\n",
    "data": {
      "title": "Helpers",
      "link": "helpers"
    },
    "excerpt": ""
  },
  "markdown/GraphQL.md": {
    "content": "\nWorks like fetch to GraphQL, where you need to provide host and/or options to receive fully Autocompleted client for schema url from your config.\n\n```js\nimport { Chain } from './ssg/main-schema/index.js';\nconst graphQLClient = Chain(ssg.config.graphql['main-schema'].url);\n\nconst response = await graphQLClient.query({ people: true });\n```\n",
    "data": {
      "link": "graphql",
      "title": "GraphQL"
    },
    "excerpt": ""
  },
  "markdown/GettingStarted.md": {
    "content": '\nInit a new project. This will create `purplehaze.json` in current directory. You don\'t need a `package.json` but you can add one for type completions.\n\n```sh\npurplehaze --init .\n```\n\nSet up config.\n\n```json\n{\n  "graphql": {\n    "pokemon": {\n      "url": "https://graphql-pokemon2.vercel.app/"\n    }\n  },\n  "in": "./pages",\n  "out": "./out",\n  "websocketPort": 1414,\n  "port": 8080\n}\n```\n\nSo you need to provide your schema url ( you can declare multiple schemas ) ,in and out dirs for purplehaze\n\nYou can also add headers if needed:\n\n```json\n{\n  "graphql": {\n    "pokemon": {\n      "url": "https://graphql-pokemon2.vercel.app/",\n      "headers": {\n        "Authorization": "Bearer MyToken"\n      }\n    }\n  },\n  "in": "./pages",\n  "out": "./out",\n  "websocketPort": 1414,\n  "port": 8080\n}\n```\n\nWatch\n\n```sh\npurplehaze\n```\n\nBuild\n\n```sh\npurplehaze --build\n```\n',
    "data": {
      "link": "getting-started",
      "title": "Getting Started"
    },
    "excerpt": ""
  },
  "markdown/EnvironmentVariables.md": {
    "content": "\nEnvironment variables must be put side by side to `purplehaze.json` in `.env` file.It is available only inside `export default` and `export const head` . They can be used only inside the `export const data` function.\n\nOf course all env variables from system are avalable too.\n\nUsage example:\n\n```\nHOST=https://example.com\n```\n\n```js\nexport const data = async () => {\n  const content = await fetch(ssg.envs.HOST);\n  return { content: await content.json() };\n};\n```\n\nIt is available only inside `export const data` and `export const head` function to prevent leaking of secrets.\n",
    "data": {
      "link": "env-variables",
      "title": "Envs"
    },
    "excerpt": ""
  },
  "markdown/Changelog.md": {
    "content": "\n## 0.0.2\n\n- added full environment variables support\n\n## 0.0.3\n\n- generate output js scripts\n- added docs responsiveness\n",
    "data": {
      "link": "changelog",
      "title": "Changelog"
    },
    "excerpt": ""
  },
  "markdown/BuiltInFunctions.md": {
    "content": "\n#### head\n\n```js\nimport { html } from './ssg/basic.js';\nexport const head = () => html`<title>Hello world!</div>`;\n```\n\n#### data, hydrate\n\nData function is used for so called data hydration in JSX frameworks and others also. It is used for Static Site rendered websites to be able to consume the data and work on client side. So you need to handle both data and hydrate functions yourself so they can be executed on output script.\n\n```tsx\n// Create your app\nexport const data = async () => {\n  const Fetch = Chain(ssg.config.graphql.pokemon.url, {\n    headers: {\n      'Content-Type': 'application/json',\n    },\n  });\n  return Fetch.query({\n    pokemons: [\n      { first: 151 },\n      {\n        number: true,\n        name: true,\n        image: true,\n        types: true,\n        resistant: true,\n        weaknesses: true,\n      },\n    ],\n  });\n};\n\ntype DataType = ReturnType<typeof data> extends Promise<infer R> ? R : never;\n\nexport const hydrate = async (staticData: DataType) =>\n  ReactDOM.hydrate(<PokemonApp response={staticData} />, document.body);\n\nexport default async (staticData: DataType) => {\n  const renderBody = document.createElement('div');\n  ReactDOM.render(<PokemonApp response={staticData} />, renderBody);\n  return renderBody.innerHTML;\n};\n```\n\n#### pages\n\nIf you export pages function you can generate multiple pages per one file. This is useful for example for single blog post page. It takes\n\n```tsx\nexport const data = async () => {\n  const Fetch = Chain(ssg.config.graphql.pokemon.url, {\n    headers: {\n      'Content-Type': 'application/json',\n    },\n  });\n  return Fetch.query({\n    pokemons: [\n      { first: 5 },\n      {\n        number: true,\n        name: true,\n        image: true,\n        types: true,\n        resistant: true,\n        weaknesses: true,\n      },\n    ],\n  });\n};\n\ntype DataType = ReturnType<typeof data> extends Promise<infer R> ? R : never;\n\nexport const pages = (staticData: DataType) => {\n  return staticData.pokemons?.map((p) => {\n    const renderBody = document.createElement('div');\n    ReactDOM.render(<PokemonApp {...p} />, renderBody);\n    return {\n      slug: p.name?.split(' ')[0],\n      body: renderBody.innerHTML,\n      data: p,\n      head: html`\n        <title>${p.name || ''}</title>\n        <link href=\"../index.css\" rel=\"stylesheet\" type=\"text/css\" />\n      `,\n    };\n  });\n};\n```\n",
    "data": {
      "title": "Functions",
      "link": "functions"
    },
    "excerpt": ""
  }
};
export {
  htmlContent
};

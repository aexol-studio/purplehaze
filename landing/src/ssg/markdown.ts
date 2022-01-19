export const htmlContent = {
    "markdown/index.md": {
        "content": "\n# 😶‍🌫️ Getting higher\n\nWelcome to the Purple Haze documentation!\n\nInspired by generative programming and weed :). So I was learning Elm language at home usually in the evening and now I am missing all this generative stuff from Elm libs in TS.\n\n## System requirements\n\n- NodeJS 12 or later\n- Mac, Win, Linux are supported\n\n## Setup\n\nInstall globally\n\n```sh\nnpm i -g purplehaze\n```\n\nor locally if you only wish to use it for one project\n\n```sh\nnpm i -D purplehaze\n```\n\n## Init\n\nInit a new project. This will create `purplehaze.json` in current directory. You don't need a `package.json` but you can add one for type completions.\n\n```sh\npurplehaze --init .\n```\n\nSet up config.\n\n```json\n{\n  \"graphql\": {\n    \"pokemon\": {\n      \"url\": \"https://graphql-pokemon2.vercel.app/\"\n    }\n  },\n  \"in\": \"./pages\",\n  \"out\": \"./out\",\n  \"websocketPort\": 1414,\n  \"port\": 8080\n}\n```\n\nSo you need to provide your schema url ( you can declare multiple schemas ) ,in and out dirs for purplehaze\n\nYou can also add headers if needed:\n\n```json\n{\n  \"graphql\": {\n    \"pokemon\": {\n      \"url\": \"https://graphql-pokemon2.vercel.app/\",\n      \"headers\": {\n        \"Authorization\": \"Bearer MyToken\"\n      }\n    }\n  },\n  \"in\": \"./pages\",\n  \"out\": \"./out\",\n  \"websocketPort\": 1414,\n  \"port\": 8080\n}\n```\n\nWatch\n\n```sh\npurplehaze\n```\n\nBuild\n\n```sh\npurplehaze --build\n```\n",
        "data": {
            "link": "",
            "title": ""
        },
        "excerpt": ""
    },
    "markdown/Routes.md": {
        "content": "\nRoutes is a file generated for type safe routing inside ssg. It will generate routes for all the files containing `default` and `pages` export\n\n```ts\nexport const routes = {\n  'page/routes': '/page/routes',\n  'page/react': '/page/react',\n  'page/pages': '/page/pages',\n  'page/import-from-url': '/page/import-from-url',\n  'page/markdown': '/page/markdown',\n  'page/graphql': '/page/graphql',\n  'page/env-variables': '/page/env-variables',\n  'page/configuration': '/page/configuration',\n  'page/changelog': '/page/changelog',\n  index: '/index',\n} as const;\n```\n",
        "data": {
            "title": "Routes",
            "link": "routes",
            "order": 1.1
        },
        "excerpt": ""
    },
    "markdown/React.md": {
        "content": "\nTo use `purplehaze` with `React` normally export a component as a default function consuming `data` function result. You can also return `React` component from head function\n\n```tsx\nimport React from 'https://cdn.skypack.dev/react';\nimport { htmlContent } from './ssg/markdown';\nimport { Layout } from './Layout';\nimport { routes } from './markdownRoutes';\nimport { renderMarkdown } from './mdtransform';\n\nexport default (data: DataType) => {\n  return (\n    <Layout prefix={data.prefix} routes={data.routes}>\n      <div\n        className=\"prose prose-lg\"\n        dangerouslySetInnerHTML={{\n          __html: renderMarkdown.render(data.content.content),\n        }}\n      ></div>\n    </Layout>\n  );\n};\n\nexport const data = () => {\n  return {\n    content: htmlContent['markdown/index.md'],\n    routes: routes(htmlContent),\n    prefix: ssg.envs.PATH_PREFIX,\n  };\n};\n\nexport const head = () => {\n  return (\n    <>\n      <link rel=\"stylesheet\" href=\"./tw.css\" />\n      <title>Purple haze docs</title>\n    </>\n  );\n};\n\ntype DataType = ReturnType<typeof data>;\n```\n",
        "data": {
            "link": "react",
            "title": "React",
            "order": 6
        },
        "excerpt": ""
    },
    "markdown/Pages.md": {
        "content": "\nIn purplehaze page is a file that exports `default` function returning `html` string\n\n### Page must contain export default\n\nString returned in contained in file export default is generated via SSG phase.\n\n```js\nexport default () => {\n  return `\n    <div>Hello world</div>\n  `;\n};\n```\n\nTo have syntax coloring in html pleas install appropriate litelement extension for your IDE.\n\n### Functions\n\nIf file exports one of built in functions they will be used in SSG phase\n\n#### data, hydrate\n\nData function is used for so called data hydration in JSX frameworks and others also. It is used for Static Site rendered websites to be able to consume the data and work on client side. So you need to handle both data and hydrate functions yourself so they can be executed on output script.\n\n```tsx\n// Create your app\nexport const data = async () => {\n  const Fetch = Chain(ssg.config.graphql.pokemon.url, {\n    headers: {\n      'Content-Type': 'application/json',\n    },\n  });\n  return Fetch.query({\n    pokemons: [\n      { first: 151 },\n      {\n        number: true,\n        name: true,\n        image: true,\n        types: true,\n        resistant: true,\n        weaknesses: true,\n      },\n    ],\n  });\n};\n\ntype DataType = ReturnType<typeof data> extends Promise<infer R> ? R : never;\n\nexport const hydrate = async (staticData: DataType) =>\n  ReactDOM.hydrate(<PokemonApp response={staticData} />, document.body);\n\nexport default async (staticData: DataType) => {\n  const renderBody = document.createElement('div');\n  ReactDOM.render(<PokemonApp response={staticData} />, renderBody);\n  return renderBody.innerHTML;\n};\n```\n\n#### head\n\nEverything in this function will be put inside head tag. It also consumes data function.\n\n```js\nexport const head = () => `<title>Hello world!</div>`;\n```\n\n#### pages\n\nIf you export pages function you can generate multiple pages per one file. This is useful for example for single blog post page. It takes\n\n```tsx\nexport const data = async () => {\n  const Fetch = Chain(ssg.config.graphql.pokemon.url, {\n    headers: {\n      'Content-Type': 'application/json',\n    },\n  });\n  return Fetch.query({\n    pokemons: [\n      { first: 5 },\n      {\n        number: true,\n        name: true,\n        image: true,\n        types: true,\n        resistant: true,\n        weaknesses: true,\n      },\n    ],\n  });\n};\n\ntype DataType = ReturnType<typeof data> extends Promise<infer R> ? R : never;\n\nexport const pages = (staticData: DataType) => {\n  return staticData.pokemons?.map((p) => {\n    const renderBody = document.createElement('div');\n    ReactDOM.render(<PokemonApp {...p} />, renderBody);\n    return {\n      slug: p.name?.split(' ')[0],\n      body: renderBody.innerHTML,\n      data: p,\n      head: html`\n        <title>${p.name || ''}</title>\n        <link href=\"../index.css\" rel=\"stylesheet\" type=\"text/css\" />\n      `,\n    };\n  });\n};\n```\n",
        "data": {
            "title": "Pages",
            "link": "pages",
            "order": 1
        },
        "excerpt": ""
    },
    "markdown/ModulesFromURL.md": {
        "content": "\n## Type Streaming\n\nFor example: If you use url that begins with `https://cdn.skypack.dev` in your import. It will try to fetch typings from skypack and save them in typings folder referencing to jsconfig. This should provide typings for example in VSCode.\n\n```tsx\nimport React from 'https://cdn.skypack.dev/react';\n```\n\nSo if the file contains url import `purplehaze` will fetch typings, add them to typings folder and tsconfig file for intellisense support.\n",
        "data": {
            "title": "Import from URL",
            "link": "import-from-url",
            "order": 2
        },
        "excerpt": ""
    },
    "markdown/Markdown.md": {
        "content": "\nMarkdown files are automatically transformed to one `markdown.ts` file. You can use its content later one inside your `ts` components and pages.\n\n```mdx\n---\nlink: hello\n---\n\n# Hello world\n\nHello there\n```\n\nWill be transformed to\n\n```ts\nexport const htmlContent = {\n  'markdown/index.md': {\n    content: '\\n# Hello world\\n\\nHello there',\n    data: {\n      link: 'hello',\n    },\n    excerpt: '',\n  },\n};\n```\n",
        "data": {
            "title": "Markdown",
            "link": "markdown",
            "order": 5
        },
        "excerpt": ""
    },
    "markdown/GraphQL.md": {
        "content": "\nWorks like fetch to GraphQL, where you need to provide host and/or options to receive fully Autocompleted client for schema url from your config.\n\n```js\nimport { Chain } from './ssg/main-schema/index.js';\nconst graphQLClient = Chain(ssg.config.graphql['main-schema'].url);\n\nconst response = await graphQLClient.query({ people: true });\n```\n",
        "data": {
            "link": "graphql",
            "title": "GraphQL",
            "order": 4
        },
        "excerpt": ""
    },
    "markdown/EnvironmentVariables.md": {
        "content": "\nEnvironment variables must be put side by side to `purplehaze.json` in `.env` file.It is available only inside `export default` and `export const head` . They can be used only inside the `export const data` function.\n\nOf course all env variables from system are avalable too.\n\nUsage example:\n\n```\nHOST=https://example.com\n```\n\n```js\nexport const data = async () => {\n  const content = await fetch(ssg.envs.HOST);\n  return { content: await content.json() };\n};\n```\n\nIt is available only inside `export const data` and `export const head` function to prevent leaking of secrets.\n",
        "data": {
            "link": "env-variables",
            "title": "Environment Variables",
            "order": 6
        },
        "excerpt": ""
    },
    "markdown/Configuration.md": {
        "content": "\n### Config\n\nConfig file can be generated or created manually. It should contain all the following values.\n\n```json\n{\n  \"graphql\": {\n    \"feature-mole\": {\n      \"url\": \"https://faker.graphqleditor.com/explore-projects/feature-mole/graphql\"\n    }\n  },\n  \"in\": \"./pages\",\n  \"out\": \"./out\",\n  \"websocketPort\": 1416,\n  \"port\": 8082\n}\n```\n\n#### Typescript\n\nURL imports also work here. Of course you can still import relative modules.\n\n```json\n{\n  \"graphql\": {\n    \"feature-mole\": {\n      \"url\": \"https://faker.graphqleditor.com/explore-projects/feature-mole/graphql\"\n    }\n  },\n  \"in\": \"./pages\",\n  \"out\": \"./out\",\n  \"websocketPort\": 1416,\n  \"port\": 8082\n}\n```\n\n#### Config Injection\n\nConfig file is injected and typed. It is available only inside `export default` and `export const head` function to prevent leaking of secrets.\n\nUsage in JS example:\n\n```js\nconst graphQLClient = Chain(ssg.config.HOST, {\n  headers: {\n    Authorization: `Bearer ${ssg.config.TOKEN}`,\n  },\n});\n```\n",
        "data": {
            "link": "configuration",
            "title": "Configuration",
            "order": 3
        },
        "excerpt": ""
    },
    "markdown/Changelog.md": {
        "content": "\n## 0.0.2\n\n- added full environment variables support\n\n## 0.0.3\n\n- generate output js scripts\n- added docs responsiveness\n\n## 0.0.4\n\n- removed basic helper functions\n- improved documentation\n- markdown transformer added\n\n## 0.0.5\n\n- Automatic import mapping to correct `js` esm exports\n- default react hydration functions\n- possibility to export default react components\n- changed pages behavior to use default export as body and feed only different data per page\n- promisified most code\n\n## 0.0.6\n\n- `ssg/routes.ts` file generation. It contains path to all `default` export files and `pages` exports\n",
        "data": {
            "link": "changelog",
            "title": "Changelog",
            "order": 99
        },
        "excerpt": ""
    }
} as const
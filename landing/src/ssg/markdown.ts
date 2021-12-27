export const htmlContent = {
    "markdown/index.md": {
        "content": "\n# 😶‍🌫️ Purple haze\n\nInspired by generative programming and weed :). So I was learning Elm language at home usually in the evening and now I am missing all this generative stuff from Elm libs in TS.\n\n## What is generated?\n\n- when you type **URL** of an esmodule typings are fetched in the background and typings generated locally for intellisense\n- when you add **Markdown** files with gray matter it will generate typings for those\n- when you add a **Page** it will generate Route types so you won't make a mistake later when routing to another page\n- when you add **GraphQL** backends it will generate Zeus libraries for it making communication with GraphQL backend type safe\n- when you modify **config** you can access type safe values from it during build ssg process\n- when you add **env variables** you can access the record with all of them\n\nIt is the missing ingredient of Web Components architecture. Simple bundler for GraphQL based website using esmodules. What makes it unique? It uses browser for bundling (not node). Remember in ESModules you can use URL imports and relative imports. You can also provide importmap for other imports\n",
        "data": {
            "link": "",
            "title": ""
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
        "content": "\n### File must contain export default\n\nString returned in contained in file export default is generated via SSG phase.\n\n```js\nimport { html } from './ssg/basic.js';\nexport default () => {\n  return html`\n    <div>Hello world</div>\n  `;\n};\n```\n\nTo have syntax coloring in html pleas install appropriate litelement extension for your IDE.\n\n### Config\n\nConfig file can be generated or created manually. It should contain all the following values.\n\n```json\n{\n  \"graphql\": {\n    \"feature-mole\": {\n      \"url\": \"https://faker.graphqleditor.com/explore-projects/feature-mole/graphql\"\n    }\n  },\n  \"in\": \"./pages\",\n  \"out\": \"./out\",\n  \"websocketPort\": 1416,\n  \"port\": 8082\n}\n```\n\n#### Typescript\n\nTurn on typescript support URL imports also works here. Of course you can still import relative modules.\n\n```json\n{\n  \"graphql\": {\n    \"feature-mole\": {\n      \"url\": \"https://faker.graphqleditor.com/explore-projects/feature-mole/graphql\"\n    }\n  },\n  \"in\": \"./pages\",\n  \"out\": \"./out\",\n  \"websocketPort\": 1416,\n  \"port\": 8082,\n  \"mode\": \"typescript\"\n}\n```\n",
        "data": {
            "link": "how-it-works",
            "title": "How it works"
        },
        "excerpt": ""
    },
    "markdown/GettingStarted.md": {
        "content": "\nInit a new project. This will create `purplehaze.json` in current directory. You don't need a `package.json` but you can add one for type completions.\n\n```sh\npurplehaze --init .\n```\n\nSet up config.\n\n```json\n{\n  \"graphql\": {\n    \"pokemon\": {\n      \"url\": \"https://graphql-pokemon2.vercel.app/\"\n    }\n  },\n  \"in\": \"./pages\",\n  \"out\": \"./out\",\n  \"websocketPort\": 1414,\n  \"port\": 8080\n}\n```\n\nSo you need to provide your schema url ( you can declare multiple schemas ) ,in and out dirs for purplehaze\n\nYou can also add headers if needed:\n\n```json\n{\n  \"graphql\": {\n    \"pokemon\": {\n      \"url\": \"https://graphql-pokemon2.vercel.app/\",\n      \"headers\": {\n        \"Authorization\": \"Bearer MyToken\"\n      }\n    }\n  },\n  \"in\": \"./pages\",\n  \"out\": \"./out\",\n  \"websocketPort\": 1414,\n  \"port\": 8080\n}\n```\n\nWatch\n\n```sh\npurplehaze\n```\n\nBuild\n\n```sh\npurplehaze --build\n```\n",
        "data": {
            "link": "getting-started",
            "title": "Getting Started"
        },
        "excerpt": ""
    }
} as const
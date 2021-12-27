---
link: ''
title: ''
---

# 😶‍🌫️ Purple haze

Inspired by generative programming and weed :). So I was learning Elm language at home usually in the evening and now I am missing all this generative stuff from Elm libs in TS.

## What is generated?

- when you type **URL** of an esmodule typings are fetched in the background and typings generated locally for intellisense
- when you add **Markdown** files with gray matter it will generate typings for those
- when you add a **Page** it will generate Route types so you won't make a mistake later when routing to another page
- when you add **GraphQL** backends it will generate Zeus libraries for it making communication with GraphQL backend type safe
- when you modify **config** you can access type safe values from it during build ssg process
- when you add **env variables** you can access the record with all of them

It is the missing ingredient of Web Components architecture. Simple bundler for GraphQL based website using esmodules. What makes it unique? It uses browser for bundling (not node). Remember in ESModules you can use URL imports and relative imports. You can also provide importmap for other imports

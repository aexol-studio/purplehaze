# Purple haze

[![NPM Version](https://img.shields.io/npm/v/purplehaze.svg?style=flat)]()
![Build](https://github.com/aexol-studio/purplehaze/actions/workflows/release.yml/badge.svg)

Inspired by generative programming and weed :). So I was learning Elm language at home usually in the evening and now I am missing all this generative stuff from Elm libs in TS.

## Documentation

[Documentation](https://aexol-studio.github.io/purplehaze/) for this project is hosted on Github Pages

## What is generated?

- when you type **URL** of an esmodule typings are fetched in the background and typings generated locally for intellisense
- when you add **Markdown** files with gray matter it will generate typings for those
- when you add a **Page** it will generate Route types so you won't make a mistake later when routing to another page
- when you add **GraphQL** backends it will generate Zeus libraries for it making communication with GraphQL backend type safe
- when you modify **config** you can access type safe values from it during build ssg process
- when you add **env variables** you can access the record with all of them

It is the missing ingredient of Web Components architecture. Simple bundler for GraphQL based website using esmodules. What makes it unique? It uses browser for bundling (not node). Remember in ESModules you can use URL imports and relative imports. You can also provide importmap for other imports

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
- [x] Create docs and landing page deployable to pages
- [ ] Resolve imports with no extension
- [x] catch esbuild transform errors
- [x] support files exporting multiple static pages
- [ ] Add possibility to override html tag
- [x] Create static gray matter typings for .md files
- [ ] Generate Routes typings for existing export default files
- [ ] catch all errors including no network error

---
link: ''
title: ''
---

# 😶‍🌫️ Getting higher

Welcome to the Purple Haze documentation!

Inspired by generative programming and weed :). So I was learning Elm language at home usually in the evening and now I am missing all this generative stuff from Elm libs in TS.

## System requirements

- NodeJS 12 or later
- Mac, Win, Linux are supported

## Setup

Install globally

```sh
npm i -g purplehaze
```

or locally if you only wish to use it for one project

```sh
npm i -D purplehaze
```

## Init

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

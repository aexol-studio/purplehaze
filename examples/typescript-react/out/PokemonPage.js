// pages/PokemonPage.tsx
import {Chain} from "./ssg/pokemon/index.js";
import React from "https://cdn.skypack.dev/react";
import {SinglePokemon} from "./SinglePokemon.js";
var PokemonPage_default = (staticData) => {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SinglePokemon, {
    ...staticData
  }));
};
var data = async () => {
  const Fetch = Chain(ssg.config.graphql.pokemon.url, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  return Fetch("query")({
    pokemons: [
      {first: 5},
      {
        number: true,
        name: true,
        image: true,
        types: true,
        resistant: true,
        weaknesses: true
      }
    ]
  });
};
var pages = (staticData) => {
  return staticData.pokemons?.map((p) => {
    return {
      slug: p.name?.split(" ")[0],
      data: p,
      head: `
        <title>${p.name || ""}</title>
        <link href="../index.css" rel="stylesheet" type="text/css" />
      `
    };
  });
};
export {
  data,
  PokemonPage_default as default,
  pages
};

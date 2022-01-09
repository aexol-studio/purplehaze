// pages/index.tsx
import {Chain} from "./ssg/pokemon/index.js";
import React from "https://cdn.skypack.dev/react";
import {SinglePokemon} from "./SinglePokemon.js";
var head = async () => `
    <title>Pokemon</title>
  `;
var pages_default = (props) => {
  return /* @__PURE__ */ React.createElement("div", null, props?.pokemons?.map((p) => /* @__PURE__ */ React.createElement(SinglePokemon, {
    key: p.name,
    ...p
  })));
};
var data = async () => {
  const Fetch = Chain(ssg.config.graphql.pokemon.url, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  return Fetch("query")({
    pokemons: [
      {first: 151},
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
export {
  data,
  pages_default as default,
  head
};

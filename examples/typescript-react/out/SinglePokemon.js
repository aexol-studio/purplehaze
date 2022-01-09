// pages/SinglePokemon.tsx
import React from "https://cdn.skypack.dev/react";
import {Selector} from "./ssg/pokemon/index.js";
var PokemonSelector = Selector("Pokemon")({
  number: true,
  name: true,
  image: true,
  weaknesses: true,
  resistant: true,
  types: true
});
var DisplayCategory = ({
  title,
  textArray
}) => /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, title), textArray?.map((m) => /* @__PURE__ */ React.createElement("span", {
  key: m
}, m)));
var SinglePokemon = ({
  number,
  name,
  image,
  weaknesses,
  resistant,
  types
}) => /* @__PURE__ */ React.createElement("a", {
  href: `./PokemonPage/${name}.html`,
  className: `Pokemon ${types?.join(" ")}`
}, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("img", {
  title: name,
  src: image
}), /* @__PURE__ */ React.createElement("span", {
  className: "Name"
}, number, ".", name)), /* @__PURE__ */ React.createElement(DisplayCategory, {
  title: "Types",
  textArray: types
}), /* @__PURE__ */ React.createElement(DisplayCategory, {
  title: "Weaknesses",
  textArray: weaknesses
}), /* @__PURE__ */ React.createElement(DisplayCategory, {
  title: "Resistance",
  textArray: resistant
}));
export {
  SinglePokemon
};

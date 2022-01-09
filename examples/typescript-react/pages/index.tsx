import { Chain } from './ssg/pokemon/index.js';
import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import { SinglePokemon } from './SinglePokemon.js';

export const head = async () => `
    <title>Pokemon</title>
  `;

export default (props: DataType) => {
  return (
    <div>
      {props?.pokemons?.map((p: any) => (
        <SinglePokemon key={p.name} {...p} />
      ))}
    </div>
  );
};

// Create your app
export const data = async () => {
  const Fetch = Chain(ssg.config.graphql.pokemon.url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return Fetch('query')({
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

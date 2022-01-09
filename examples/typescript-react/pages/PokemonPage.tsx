import { Chain } from './ssg/pokemon/index.js';
import React from 'https://cdn.skypack.dev/react';
import { SinglePokemon } from './SinglePokemon.js';

export default (staticData: SingleData) => {
  return (
    <div>
      <SinglePokemon {...staticData} />
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
      { first: 5 },
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
type SingleData = Required<DataType>['pokemons'] extends Array<infer R>
  ? Required<R>
  : never;

export const pages = (staticData: DataType) => {
  return staticData.pokemons?.map((p) => {
    return {
      slug: p.name?.split(' ')[0],
      data: p,
      head: `
        <title>${p.name || ''}</title>
        <link href="../index.css" rel="stylesheet" type="text/css" />
      `,
    };
  });
};

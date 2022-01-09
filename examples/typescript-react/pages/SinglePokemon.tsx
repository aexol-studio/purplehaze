import React from 'https://cdn.skypack.dev/react';
import { Selector, InputType, GraphQLTypes } from './ssg/pokemon/index';

const PokemonSelector = Selector('Pokemon')({
  number: true,
  name: true,
  image: true,
  weaknesses: true,
  resistant: true,
  types: true,
});

type PokemonType = InputType<GraphQLTypes['Pokemon'], typeof PokemonSelector>;

const DisplayCategory = ({
  title,
  textArray,
}: {
  title: string;
  textArray: PokemonType['weaknesses'];
}) => (
  <div>
    <span>{title}</span>
    {textArray?.map((m) => (
      <span key={m}>{m}</span>
    ))}
  </div>
);

export const SinglePokemon = ({
  number,
  name,
  image,
  weaknesses,
  resistant,
  types,
}: PokemonType) => (
  <a
    href={`./PokemonPage/${name}.html`}
    className={`Pokemon ${types?.join(' ')}`}
  >
    <div>
      <img title={name} src={image} />
      <span className="Name">
        {number}.{name}
      </span>
    </div>
    <DisplayCategory title="Types" textArray={types} />
    <DisplayCategory title="Weaknesses" textArray={weaknesses} />
    <DisplayCategory title="Resistance" textArray={resistant} />
  </a>
);

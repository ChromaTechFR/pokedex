import React from "react";
import Link from "next/link";
import Head from "next/head";

export default function pokemon({ pokemon }) {
  return (
    <>
      <div>
        <Head>
          <meta property='og:image' content={pokemon.image} />
          <link rel='icon' href='/favicon.ico' />
          <meta
            name='description'
            content={`${pokemon.name} | height:${pokemon.height}/weigth${pokemon.weight}`}
          />
          <title>
            pokedex {pokemon.name} | n.{pokemon.id}
          </title>
        </Head>
        <main>
          <div>
            <img src={pokemon.image} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </div>
          {pokemon.types.map((type, index) => {
            return <p key={index}>{type.type.name}</p>;
          })}

          <ul>
            {pokemon.stats.map((stat, index) => {
              return (
                <li key={index}>
                  {stat.base_stat} {stat.stat.name}
                </li>
              );
            })}
          </ul>
          <Link href='/'>
            <a>Home page</a>
          </Link>
        </main>
      </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const id = query.id;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await res.json();
    const formatedIndex = ("00" + id).slice(-3);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatedIndex}.png`;
    pokemon.image = image;
    return {
      props: { pokemon },
    };
  } catch (error) {}
}

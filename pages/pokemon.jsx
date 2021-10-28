import React from "react";
import Link from "next/link";
import Head from "next/head";
import Navbar from "../components/Navbar";

export default function pokemon({ pokemon, pokeman_f }) {
  return (
    <>
      {pokemon ? (
        <div>
          <Head>
            <meta property='og:image' content={pokemon.image} />
            <link rel='icon' href='./favicon.ico' />
            <meta
              name='description'
              content={`${pokemon.name} | height:${pokemon.height}/weigth:${pokemon.weight}`}
            />
            <title>
              pokedex {pokemon.name} | n.{pokemon.id}
            </title>
          </Head>
          <main>
            <div className='wrapper-pokemon'>
              <div className='left-pokemon'>
                <img src={pokemon.image} alt={pokemon.name} />
                <p>{pokemon.name}</p>
              </div>
              <div className='right-pokemon'>
                <div className='type'>
                  <h2>Type:</h2>
                  {pokemon.types.map((type, index) => {
                    return <p key={index}>{type.type.name}</p>;
                  })}
                </div>
                <div className='spec'>
                  <h2>Spec:</h2>
                  <ul>
                    {pokemon.stats.map((stat, index) => {
                      return (
                        <li key={index}>
                          {stat.base_stat} {stat.stat.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className='home'>
              <Link href='/'>
                <a>Home page</a>
              </Link>
            </div>
          </main>
        </div>
      ) : (
        <>
          <Navbar />
          <ul>
            {pokeman_f.map((poke, index) => {
              return (
                <li key={index}>
                  <img src={poke.image} alt='' />
                  <p>
                    {poke.name} | n.{poke.id}
                  </p>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
}

export async function getServerSideProps({ query }) {
  const id = query.id;
  const filter = query.type;
  const filterarr = filter.split(" ");

  if (id) {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const pokemon = await res.json();
      const formatedIndex = ("00" + id).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatedIndex}.png`;
      pokemon.image = image;
      return {
        props: { pokemon },
      };
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const pokemonFiltered = async () => {
        const pokeman_arr = [];
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        const { results } = await res.json();

        const pokemonFilter = results.map((result, index) => {
          const formatedIndex = ("00" + (index + 1)).slice(-3);
          const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatedIndex}.png`;
          return {
            ...result,
            image,
            index,
          };
        });

        for await (const type of filterarr) {
          console.log(type);
          for await (const pokeman of pokemonFilter) {
            const res = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${pokeman.name}`
            );
            const pokemanInfo = await res.json();
            const types = pokemanInfo.types[0].type.name;
            if (types.includes(type)) {
              pokemanInfo.image = pokeman.image;
              pokeman_arr.push(pokemanInfo);
            }
          }
        }
        return pokeman_arr;
      };

      const pokeman_f = await pokemonFiltered();

      return {
        props: { pokeman_f },
      };
    } catch (error) {
      console.log(error);
    }
  }
}

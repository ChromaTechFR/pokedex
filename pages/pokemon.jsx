import React from "react";
import Link from "next/link";
import Head from "next/head";
import Navbar from "../components/Navbar";

export default function pokemon({ pokemon, pokeman }) {
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
          {pokeman.map((poke, index) => {
            return <p key={index}>{poke}</p>;
          })}
        </>
      )}
    </>
  );
}

export async function getServerSideProps({ query }) {
  const id = query.id;
  const filter = query.type;

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
      const filterarr = filter.split(" ");
      const HandleType = async () => {
        let arr = [];
        for await (const typepoke of filterarr) {
          const response = await fetch(
            `https://pokeapi.co/api/v2/type/${typepoke}`
          );
          const type = await response.json();
          for await (const poke of type.pokemon) {
            arr.push(poke.pokemon.name);
          }
          arr;
        }
        return arr;
      };

      const pokeman = await HandleType();
      console.log(pokeman);

      return {
        props: { pokeman },
      };
    } catch (error) {
      console.log(error);
    }
  }
}

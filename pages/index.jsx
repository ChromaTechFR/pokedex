import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Index({ pokemon }) {
  return (
    <div>
      <Head>
        <title>pokedex</title>
        <meta name='description' content='Pokedex made with next.js' />
        <link rel='icon' href='./favicon.ico' />
        <meta property='og:image' content='/pokeball.jpg' />
      </Head>

      <main>
        <Navbar pokemon={pokemon} />
        <ul className='wrapper'>
          <>
            {pokemon.map((result, index) => {
              return (
                <li key={index} className='pokemon-card'>
                  <Link href={`/pokemon?id=${index + 1}`}>
                    <a>
                      <img src={result.image} alt={result.name} />
                      <div className='info'>
                        <span>n.{index + 1} </span>
                        {" | "}
                        {result.name}
                      </div>
                    </a>
                  </Link>
                </li>
              );
            })}
          </>
        </ul>
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const { results } = await res.json();

    const pokemon = results.map((result, index) => {
      const formatedIndex = ("00" + (index + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatedIndex}.png`;
      return {
        ...result,
        image,
        index,
      };
    });
    return {
      props: { pokemon },
    };
  } catch (error) {
    console.log(error);
  }
}

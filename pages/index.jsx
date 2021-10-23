import Head from "next/head";
import Link from "next/link";

export default function Home({ pokemon }) {
  return (
    <div>
      <Head>
        <title>pokedex</title>
        <meta name='description' content='Pokedex made with next.js' />
        <link rel='icon' href='./favicon.ico' />
        <meta property='og:image' content='/pokeball.jpg' />
      </Head>

      <main>
        <h1 className='flex justify-center text-7xl'>Pokedex</h1>

        <ul className='box-border'>
          {pokemon.map((result, index) => {
            return (
              <li key={index} className='inline-flex border-2'>
                <Link href={`/pokemon?id=${index + 1}`}>
                  <a>
                    <img
                      src={result.image}
                      alt={result.name}
                      className='w-64 h-64'
                    />
                    <div className='flex justify-center'>
                      <span className='text-gray-400 mr-1'>n.{index + 1} </span>
                      {" | "}
                      {result.name}
                    </div>
                  </a>
                </Link>
              </li>
            );
          })}
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
      };
    });
    return {
      props: { pokemon },
    };
  } catch (error) {
    console.log(error);
  }
}

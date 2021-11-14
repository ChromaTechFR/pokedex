const { Client, Intents } = require('discord.js');
const fetch = require('node-fetch');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
require('dotenv').config()

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
    const args = message.content.split(" ")
    if (args[0] === "-pokemon") {
        if (args[1]) {

            const query = args[1]

            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
                const pokemon = await res.json();
                console.log(pokemon)
                const formatedIndex = ("00" + pokemon.id).slice(-3);
                const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatedIndex}.png`;
                pokemon.image = image;

                message.reply({
                    content: pokemon.image
                })
            } catch (err) {
                console.log(err)
            }
        } else {
            message.reply({
                content: "aucun argument donné"
            })
        }
    }
})

client.login(process.env.TOKEN);
const { Client, Intents, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
require('dotenv').config()

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
    const args = message.content.split(" ");
    const query = args[1]?.toLowerCase();
    const option = args[2]?.toLowerCase();
    let data;
    if (args[0] === "-pokemon") {
        if (query) {
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
                const pokemon = await res.json();
                

                const embed = new MessageEmbed()
                    .setTitle(pokemon.name)
                    .setColor('RED')
                    .setDescription('type(s):')

                    pokemon.types.forEach((e)=>{
                        embed.addField(`${e.slot}`,`${e.type.name}`)
                    })
                   

                if (option === "shiny") {

                    data = pokemon.sprites.front_shiny;
                    embed.setImage(data)

                    message.channel.send({
                        embeds: [embed]
                    })

                } else {

                    data = pokemon.sprites.front_default
                    embed.setImage(data)

                    message.channel.send({
                        embeds: [embed]
                    })
                }
            } catch (err) {
                console.log(err)
                message.reply({
                    content: "aucune image trouvé"
                })
            }
        } else {
            message.reply({
                content: "aucun argument donné"
            })
        }
    }
})

client.login(process.env.TOKEN);
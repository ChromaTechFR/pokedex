const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
require('dotenv').config()

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (message) => {
    console.log(message)
    if (message.content === "_ping") {
        message.reply({
            content: "pong"
        });
    }
})

client.login(process.env.TOKEN);
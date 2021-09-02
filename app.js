const { Client, Collection } = require("discord.js");
const fs = require("fs");
const { bot } = require("./src/config.json");
const client = new Client({ partials: ["USER", "MESSAGE", "CHANNEL", "REACTION"], ws: {
    properties: {
        $os: "Discord iOS"
    }
} })

const disbut = require('discord-buttons');
disbut(client)

client.comandos = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./src/comandos/");

["aliases", "comandos"].forEach(x => client[x] = new Collection());
["comando", "eventos"].forEach(x => require(`./src/handlers/${x}`)(client)); 


client.login(bot.token);

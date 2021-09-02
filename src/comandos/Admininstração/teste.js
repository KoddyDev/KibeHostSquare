const Discord = require("discord.js")
module.exports = {
    name: "test",
    run: async (client, message) => {

if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Você precisa da permissão ``Admininstrador`` para utilizar este comando :(")
    
        return message.reply(new Discord.MessageEmbed()
        .setAuthor("teste", "https://media.discordapp.net/attachments/529064521621438464/865860948246265876/unknown.png", "https://cdn.discordapp.com/emojis/781018491237957642"))
        
}}
var disbut = require("discord-buttons")
const Ticket = require("../../Database/Models/Tickets")
const config = require("../../config.json")
module.exports = {
    name: "ticket",
    run: async (client, message) => {

if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Você precisa da permissão ``Admininstrador`` para utilizar este comando :(")
    
    
const select = new disbut.MessageMenu()
    .setID('ticket')
    .setPlaceholder('Clique para visualizar as opções')
    .setMaxValues(1)
    .setMinValues(1)
let tipos = ""
    for(let i = 0; i < config.ticket.tipos.length; i++) {
        let novo = new disbut.MessageMenuOption()
        .setValue(config.ticket.tipos[i].id)
        .setEmoji(config.ticket.tipos[i].emoji)
        .setLabel(config.ticket.tipos[i].nome)
        .setDescription(config.ticket.tipos[i].descricao)
        select.addOption(novo)
        tipos += config.ticket.tipos[i].emoji+" - "+config.ticket.tipos[i].nome+"\n"
    }
 let valor = ""

 if(config.ticket.embed.site !== "nenhum") {
    valor =+ "🌎 [Site]("+config.ticket.embed.site+")\n"
}
if(config.ticket.embed.instagram !== "nenhum") {
    valor =+ "🌎 [Site]("+config.ticket.embed.instagram+")\n"
}
if(config.ticket.embed.tutoriais !== "nenhum") {
    valor =+ "🌎 [Site]("+config.ticket.embed.tutoriais+")\n"
}
        message.channel.send(new (require("discord.js")).MessageEmbed()
        .setAuthor("📫 Central de atendimento")
        .setDescription(`
            Olá, seja bem-vindo a central de atendimento da ${config.ticket.embed.hostName}.
            Para iniciar seu atendimento reaja no ícone abaixo correspondente ao departamento.Seu atendimento será realizado por meio de um canal privado.`)
        .addField("**Departamentos:**", `
${tipos}
        `, true)
        .addField("**Tickets:**", `
            📨 Abertos: ${await Ticket.findAndCountAll({where: {
                resolved: false
            }}).then(value => { return value.count } )}
            📫 Totais: ${await Ticket.findAndCountAll().then((value) => { return value.count })}

            ${valor}
            `, true)
        .addField(config.ticket.embed.horario.title, config.ticket.embed.horario.fim, true)
        .setImage(config.ticket.embed.image)
        .setColor(config.ticket.embed.cor).setTimestamp()
        .setFooter("Desenvolvido por uVini__#1004")
    
        , select)
        
    }
}
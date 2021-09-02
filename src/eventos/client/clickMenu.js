const config = require("../../config.json")
const Ticket = require("../../Database/Models/Tickets")
var disbut = require("discord-buttons")
const fs = require("fs")
const { dirname } = require("path")
const { Interface } = require("readline")
module.exports = async (client, button) => {
    
for(let i = 0; i < config.ticket.tipos.length; i++) {
    load(config.ticket.tipos[i].id, "", config.ticket.tipos[i].canalName)
}
    if(button.values[0] === "fechar_com") {
        await button.reply.defer("A")
       const findT = await Ticket.findOne({where: {
            closeMessageId: button.message.id,
            resolved: false
        }})
        if(findT) {
            findT.update({
                resolved: true
            })
            await button.message.channel.messages.fetch().then(msg22 => {
                var logStream = fs.createWriteStream('./src/temp/ticket_'+ client.users.cache.get(findT.authorId).username+'.txt', {flags: 'w'});
                msg22.sort()
                for (let [key, value, embeds] of msg22) {
                  var hour = "",
                       minutes = "",
                      seconds = ""
                  const date = new Date(value.createdTimestamp);
                    if(date.getDay() <= 9) { day = "0"+date.getDay() } else { day = date.getDay() }
                    if(date.getMonth() <= 9) { month = "0"+date.getMonth() } else { month = date.getMonth() }
                    if(date.getHours() <= 9) { hour = "0"+date.getMonth() } else { your = date.getMonth() }
                    if(date.getMinutes() <= 9) { minutes = "0"+date.getMinutes() } else { minutes = date.getMinutes() }
                    
                    if(date.getSeconds() <= 9) { seconds = "0"+date.getSeconds() } else { seconds = date.getSeconds() }
                    let dateString = `${day}/${month}/${date.getFullYear()} ${hour}:${minutes}:${seconds}`;
        if(value.content.length !== " ") {
        logStream.write(`${value.author.tag} - ${dateString}\nMensagem: ${value.content}\n`)
    } else {
        logStream.write(`${value.author.tag} - ${dateString}\nMensagem: ${value.embeds}\n`)
    }
              }
              logStream.end("FIM!");
               })
               button.message.delete()
                button.message.channel.send("Finalizando ticket em 3 segundos").then(m2 => {
                  setTimeout(async () => {
                    client.users.cache.get(findT.authorId).send("O seu ticket foi finalizado por: " + button.clicker.user.tag, {
                        files: ['./src/temp/ticket_'+ client.users.cache.get(findT.authorId).username+'.txt']
                })
                    let path = './src/temp/ticket_'+ client.users.cache.get(findT.authorId).username+'.txt'
                   await client.channels.cache.get(config.ids.channels.logs).send("O ticket de " + client.users.cache.get(findT.authorId).username+ " foi fechado por " + button.clicker.user.tag,{
                     files: ['./src/temp/ticket_'+ client.users.cache.get(findT.authorId).username+'.txt']
                   })
                    setTimeout(() => {
                      try {
                        fs.unlinkSync(path)
                    button.message.channel.delete()
                        //file removed
                      } catch(err) {
                        console.error(err)
                      }
                    }, 2500)
                }, 3000)
            })

        } else {
            return button.clicker.user.send("Canal invalido :x:")
        }
    }
    if(button.values[0] === "fechar_sem") {
            await button.reply.defer("A")
           const findT = await Ticket.findOne({where: {
                closeMessageId: button.message.id,
                resolved: false
            }})
            if(findT) {
                findT.update({
                    resolved: true
                })
                await button.message.channel.messages.fetch().then(msg22 => {
                    msg22.sort()
                    var logStream = fs.createWriteStream('./src/temp/ticket_'+ client.users.cache.get(findT.authorId).username+'.txt', {flags: 'w'});
                    for (let [key, value, embeds] of msg22) {
                      var hour = "",
                           minutes = "",
                          seconds = ""
                      const date = new Date(value.createdTimestamp);
                        if(date.getDay() <= 9) { day = "0"+date.getDay() } else { day = date.getDay() }
                        if(date.getMonth() <= 9) { month = "0"+date.getMonth() } else { month = date.getMonth() }
                        if(date.getHours() <= 9) { hour = "0"+date.getMonth() } else { your = date.getMonth() }
                        if(date.getMinutes() <= 9) { minutes = "0"+date.getMinutes() } else { minutes = date.getMinutes() }
                        
                        if(date.getSeconds() <= 9) { seconds = "0"+date.getSeconds() } else { seconds = date.getSeconds() }
                        let dateString = `${day}/${month}/${date.getFullYear()} ${hour}:${minutes}:${seconds}`;
            
            logStream.write(`${value.author.tag} - ${dateString}\nMensagem: ${value.content}\n`)
                    
                  }
                  logStream.end("FIM!");
                   })
                  
                   button.message.delete()
                    button.message.channel.send("Finalizando ticket em 5 segundos").then(m2 => {
                      setTimeout(async () => {
                        client.users.cache.get(findT.authorId).send("O seu ticket foi finalizado por: " + button.clicker.user.tag)
                        let path = './src/temp/ticket_'+ client.users.cache.get(findT.authorId).username+'.txt'
                       await client.channels.cache.get(config.ids.channels.logs).send("O ticket de " + client.users.cache.get(findT.authorId).username+ " foi fechado por " + button.clicker.user.tag,{
                         files: ['./src/temp/ticket_'+ client.users.cache.get(findT.authorId).username+'.txt']
                       })
                        setTimeout(() => {
                          try {
                            fs.unlinkSync(path)
                        button.message.channel.delete()
                            //file removed
                          } catch(err) {
                            console.error(err)
                          }
                        }, 4500)
                    })
                })
    
            } else {
                return button.clicker.user.send("Canal invalido :x:")
            }
        
    }
    async function load(id, color, namec) {
        if(button.values[0] === id) {
            let perm = [
                {
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'],
                    id: button.clicker.user.id
                },
                {
                    deny: 'VIEW_CHANNEL',
                    id: button.message.guild.id
                }
            ]
            for(let i = 0; i < config.ids.cargos.tickets.length; i++) {
                perm.push(                {
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'],
                    id: config.ids.cargos.ticket[i]
                },)
            }
            if(await Ticket.findOne({where: {
                authorId: button.clicker.user.id,
                resolved: false
            }})) return await button.reply.send("Você já tem um ticket em aberto.", true)
            await button.reply.defer()
            const canal = await button.message.guild.channels.create(namec, {
                parent: config.ids.categories.ticket,
                type: 'text',
                permissionOverwrites: perm
              })
              
              var tipo1 = new disbut.MessageMenuOption()
              .setLabel("Fechar Ticket - Sem Logs")
              .setEmoji('730798799286566943')
              .setValue('fechar_sem')
              .setDescription('Fecha o ticket e envia as logs para os staff\'s ')
              var tipo2 = new disbut.MessageMenuOption()
              .setLabel("Fechar Ticket - Com Logs")
              .setEmoji('730798799286566943')
              .setValue('fechar_com')
              .setDescription('Fecha o Ticket e envia uma transcript para todos.')
const msg = await canal.send("<@"+button.clicker.id+">", { embed: new (require("discord.js")).MessageEmbed()
.setAuthor("📫 Ticket")
.setDescription(`
Olá <@${button.clicker.user.id}> 👋, conte-nos de que você precisa e em breve alguém da equipe entrara em contato com você.

Clique no 🔐 para fechar o ticket.`),  menu: new disbut.MessageMenu()
.setID('ticket')
.setPlaceholder('Clique para visualizar as opções')
.setMaxValues(1)
.setMinValues(1)
.addOption(tipo1)
.addOption(tipo2)})
              const newP = await Ticket.create({
                authorId: button.clicker.user.id,
                channelId: canal.id,
                guildId: button.message.guild.id,
                resolved: false,
                closeMessageId: msg.id
            })
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
        tipos =+ `${config.ticket.tipos[i].emoji} - ${config.ticket.tipos[i].nome}\n`
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
        button.message.edit(new (require("discord.js")).MessageEmbed()
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
        )
        }
    }

}
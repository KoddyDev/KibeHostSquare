module.exports = async (client, message) => {

  const { bot } = require("../../config.json");
  
  if (message.author.bot) return;

  if (message.author.bot && message.guild) return;
  if (message.channel.type === "dm") return;
  if (!message.content.startsWith(bot.prefixo)) return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content.slice(bot.prefixo.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let comando = client.comandos.get(cmd);
  if (!comando) comando = client.comandos.get(client.aliases.get(cmd));

  if (comando) {
    comando.run(client, message, args);
  } else {
    message.channel.send('Comando não existe!').then(message => message.delete({ timeout: 5000 }));
  }
};

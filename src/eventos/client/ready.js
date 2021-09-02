
module.exports = client => {

  const moment = require("moment");
  moment.locale("pt-br");
  require("moment-duration-format");

  setInterval(function () {

    var tabela = [
      { name: `Kibado por uVini__#1004`, type: 3 }
    ]
    let altstatus = tabela[Math.floor(Math.random() * tabela.length)];
    client.user.setActivity(altstatus)
  }, 25000);

  console.log("+------------------------------------+    ");
  console.log(`|  ${client.user.username} ESTÁ ONLINE    `);
  console.log("+------------------------------------+    ");
  console.log(`| Comandos: ${client.comandos.size}       `);
  console.log(`| Servidores: ${client.guilds.cache.size} `);
  console.log(`| Canais: ${client.channels.cache.size}   `);
  console.log(`| Membros: ${client.users.cache.size}     `);
  console.log("+------------------------------------+    ");

require("../../Database/Start").authenticate().then(() => {
  require("../../Database/Models/Tickets").init((require('../../Database/Start'))).sync({force: false})
})
}

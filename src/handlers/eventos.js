const { readdirSync } = require("fs")

module.exports = (client) => {
    console.log(`[EVENTOS] Carregando...`);
    const load = dirs => {    
        const eventos = readdirSync(`./src/eventos/${dirs}/`).filter(d => d.endsWith('.js'));
        for (let file of eventos) {
            const evt = require(`../eventos/${dirs}/${file}`);
            let eName = file.split('.')[0];
            client.on(eName, evt.bind(null, client));
          };
        };

        ["client"].forEach(x => load(x))

        console.log(`[EVENTOS] Carregado.`)
};
const { Users } = require('../economy_database/db_objects');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client){
        console.log('[INFO] ', `${client.user.username}#${client.user.discriminator} is online.`);
        client.user.setPresence({activity:{name:`${client.guilds.cache.size} guilds.`, type:'WATCHING'}, status: 'online'});

        const storedBalances = await Users.findAll();
        storedBalances.forEach(bal => client.currency.set(bal.user_id, bal));

    }
}
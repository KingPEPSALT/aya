const User = require('../xp_database/db_objects');
const chalk = require('chalk')
module.exports = {
    name: 'ready',
    once: true,
    async execute(client){
        console.log(chalk.green('[INFO] '), `${client.user.username}#${client.user.discriminator} is online.`);
        client.user.setPresence({activity:{name:`${client.guilds.cache.size} guilds.`, type:'WATCHING'}, status: 'online'});

        const storedExperiences = await User.findAll();
        storedExperiences.forEach(user => client.experiences.set(user.user_id, user));

    }
}
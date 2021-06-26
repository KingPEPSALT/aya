module.exports = {
    name:'guildCreate',
    execute(guild, client){
        console.log(`Joined ${guild}`);
        client.user.setPresence({activity:{name:`${client.guilds.cache.size} guilds.`, type:'WATCHING'}, status: 'online'});
    }
}
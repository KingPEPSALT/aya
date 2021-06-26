module.exports = {
    name:'guildDelete',
    execute(guild, client){
        console.log(`Left ${guild}`);
        client.user.setPresence({activity:{name:`${client.guilds.cache.size} guilds.`, type:'WATCHING'}, status: 'online'});
    }
}
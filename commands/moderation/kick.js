
module.exports = {
    name:'kick',
    alias:['boot'],
    description:'Kick a user from the server.',
    args: true,
    usage: '<user> <reason>',
    guildOnly: true,
    permissions: ['KICK_MEMBERS'],
    async execute(msg, args){
        const guildMember = msg.mentions.members.first();
        if(!guildMember) return msg.channel.send('That user doesn\'t exist in this server!');
        if(guildMember.user==msg.author || guildMember.user==msg.client.user) return msg.channel.send("Nice try idiot.");
        if(args[1]) guildMember.dmChannel.send(`You have been kicked from **${msg.guild.name}**. Reason: ${args[1]}`);
        return guildMember.kick(args[1] ? args[1] : '');
    }
}
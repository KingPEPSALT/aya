// error red: 0xe83f3f
// success green: 0x22e34c

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
        if(!guildMember) return msg.channel.send({embed:{color:0xe83f3f, description:'That user doesn\'t exist in this server!'}});
        if(guildMember.user==msg.author || guildMember.user==msg.client.user) return msg.channel.send("Wow you're really funny.");
        if(args[1]) guildMember.dmChannel.send(`You have been kicked from **${msg.guild.name}**. Reason: ${args[1]}`);
        await guildMember.kick(args[1] ? args[1] : '');
        return msg.channel.send({embed:{color:0x22e34c,description:`Successfully kicked \`${guildMember.user.tag}\``}});
    }
}
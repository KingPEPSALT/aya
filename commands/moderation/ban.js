
module.exports = {
    name:'ban',
    description:'ban a user from the server.',
    args: true,
    usage: '<user> <reason>',
    guildOnly: true,
    permissions: ['BAN_MEMBERS'],
    async execute(msg, args){
        const guildMember = msg.mentions.members.first();
        if(!guildMember) return msg.channel.send({embed:{color:0xe83f3f, description:'That user doesn\'t exist in this server!'}});
        if(guildMember.user==msg.author || guildMember.user==msg.client.user) return msg.channel.send("You almost got me.");
        if(args[1]) {
            await guildMember.user.send(`You have been banned from **${msg.guild.name}**. Reason: ${args.slice(2).join(' ')}`).catch(()=>{console.log(`${guildMember.user.username}#${guildMember.user.discriminator} could not be DMed.`)});
        }
        await guildMember.ban({days:0, reason: args[1] ? args.slice(1).join(' ') : ''});
        return msg.channel.send({embed: {color:0x22e34c, description:`Succesfully banned \`${guildMember.user.tag}\``}});
    }
}
const { MessageEmbed } = require('discord.js');
module.exports = {
    name:'leaderboard',
    alias:['showleaderboard','board', 'lb'],
    description:"Show's the global xp leaderboard!",
    args:false,
    guildOnly:true,
    async execute(msg, args){
        let msgEmbed = new MessageEmbed().setColor(0x5dade3).setTitle("Global leaderboard");
        let i = 0;
        for(let user of msg.client.experiences.sort((a,b)=>b.experience-a.experience)
        .first(5)){
            const username = await msg.client.users.fetch(user.user_id).then(user=>user.username)
            msgEmbed.addFields({
                    name:'\u200B',
                    value: `\`${++i}.\` \`${username}\`: \`${user.experience}\` XP`
            })
        }
        return await msg.channel.send({embed:msgEmbed})
    }
}
module.exports = {
    name:'leaderboard',
    alias:['showleaderboard','board', 'lb'],
    description:"Show's the global xp leaderboard!",
    args:false,
    guildOnly:true,
    async execute(msg, args){
        return msg.channel.send({embed:{
            color:0x5dade3,
            title:`Global leaderboard`,
            
            fields:msg.client.experiences.sort((a,b)=>b.experience-a.experience)
                .first(5)
                .map((user, position)=>({
                    name:'\u200B',
                    value: `\`${position+1}.\` \`${msg.client.users.cache.get(user.user_id).tag}\`: \`${user.experience}\` XP`
                }))
        }});
    }
}
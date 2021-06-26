module.exports = {
    name:'leaderboard',
    alias:['showleaderboard','board'],
    description:"Show's the global economy leaderboard!",
    args:false,
    guildOnly:true,
    async execute(msg, args){
        return msg.channel.send({embed:{
            color:0x5dade3,
            title: `Global leaderboard`,
            
            fields:msg.client.currency.sort((a,b)=>b.balance-a.balance)
                .filter(user => msg.client.users.cache)
                .first(10)
                .map((user, position)=>({
                    name:'\u200B',
                    value:`\`${position+1}. ${msg.client.users.cache.get(user.user_id).tag}\`: £${user.balance}`
                }))
        }});
    }
}
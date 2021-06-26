
const Discord = require('discord.js')

module.exports = {
    name:'queue',
    alias:['q','showqueue'],
    description:'Shows the current queue.',
    args:false,
    guildOnly:true,
    async execute(msg, args){
        if(!msg.client.queues.has(msg.guild)) return msg.channel.send({embed:{color:0xe83f3f, description:"The queue is empty."}});
        const fields = msg.client.queues.get(msg.guild).queue.map((song, idx)=>({name:idx==0?'__Playing__':'\u200b',value:`\`${idx+1}.\` [${song.title} - ${song.channel}](${song.url}) - \`${song.formattedLength()} | Requested by ${song.requester.tag}\``, inline:false}))
        const embed = {
            color: 0x5dade3,
            title: `${msg.guild.name} QUEUE`,
            fields: fields
        }
        return msg.channel.send({embed:embed});
    }
}
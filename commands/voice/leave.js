
module.exports = {
    name:'leave',
    alias: ['disconnect', 'dc','stop'],
    description: 'Leaves the voice channel.',
    args: false,
    guildOnly: true,
    async execute(msg, args){
        if(!msg.client.queues.has(msg.guild)) return msg.channel.send({embed:{color:0xe83f3f, description:'I\'m not in a voice channel.'}});
        if(!(msg.client.queues.get(msg.guild).voice.channel == msg.guild.voice.channel)) return msg.channel.send({embed:{color:0xe83f3f, description:'You aren\'t in my voice channel.'}});
        await msg.client.queues.get(msg.guild).voice.channel.leave();
        return msg.channel.send({embed:{color:0x22e34c,description:'Successfully disconnected...'}});
    }
}
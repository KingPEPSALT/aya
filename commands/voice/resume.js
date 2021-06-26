
module.exports = {
    name: 'resume',
    alias: ['carryon'],
    description: 'Resumes the currently paused audio.',
    args:false,
    guildOnly:true,
    async execute(msg, args){
        if(!msg.client.queues.has(msg.guild)) return msg.channel.send({embed:{color:0xe83f3f, description:'Nothing is playing'}});
        const returnVal = msg.client.queues.get(msg.guild).resume();
        return msg.channel.send(returnVal ? {embed:{color:0xe83f3f, description:returnVal}} : {embed:{color:0x22e34c,description:'Successfully resumed...'}});
    }
}
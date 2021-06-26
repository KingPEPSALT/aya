
module.exports = {
    name: 'pause',
    description: 'Pauses the currently playing audio.',
    args:false,
    guildOnly:true,
    async execute(msg, args){
        if(!msg.client.queues.has(msg.guild)) return msg.channel.send({embed:{color:0xe83f3f, description:"Nothing is playing..."}})
        const returnVal = msg.client.queues.get(msg.guild).pause();
        return msg.channel.send(returnVal ? {embed:{color:0xe83f3f, description:returnVal}} : {embed:{color:0x22e34c,description:'Successfully paused...'}});
    }
}
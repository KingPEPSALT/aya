
module.exports = {
    name: 'skip',
    alias: ['s', 'fs', 'skp'],
    description:'Skips the currently playing song.',
    args: false,
    guildOnly:true,
    async execute(msg, args){
        if(!msg.client.queues.has(msg.guild)) return msg.channel.send("I'm not playing anything.");
        const returnVal = msg.client.queues.get(msg.guild).skip();
        return msg.channel.send(returnVal ? {embed:{color:0xe83f3f, description:returnVal}} : {embed:{color:0x22e34c,description:'Successfully skipped...'}})
    }
}
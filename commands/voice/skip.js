
module.exports = {
    name: 'skip',
    alias: ['s', 'fs'],
    description:'Skips the currently playing song.',
    args: false,
    guildOnly:true,
    async execute(msg, args){
        if(!msg.client.queues.has(msg.guild)) return msg.channel.send("I'm not playing anything.");
        const returnVal = msg.client.queues.get(msg.guild).skip();
        return msg.channel.send(returnVal || 'Successfully skipped...')
    }
}
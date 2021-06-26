module.exports = {
    name: 'pause',
    description: 'Pauses the currently playing audio.',
    args:false,
    guildOnly:true,
    async execute(msg, args){
        if(!msg.client.queues.has(msg.guild)) return msg.channel.send("Nothing is playing...")
        const returnVal = msg.client.queues.get(msg.guild).pause();
        return msg.channel.send(returnVal || "Successfully paused...");
    }
}
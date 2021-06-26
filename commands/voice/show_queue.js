module.exports = {
    name:'queue',
    alias:['q','showqueue'],
    description:'Shows the current queue.',
    args:false,
    guildOnly:true,
    async execute(msg, args){
        if(!msg.client.queues.has(msg.guild)) return msg.channel.send("The queue is empty.");
        return msg.channel.send(msg.client.queues.get(msg.guild).displayQueue(), {code:true});
    }
}

module.exports = { 
    name:'clear',
    alias: ['empty', 'clearqueue', 'cq'],
    description:'Clears all the songs from the queue.',
    args:false,
    guildOnly:true,
    async execute(msg, args){
        if(!msg.client.queues.has(msg.guild)) return msg.channel.send('The queue is empty.');
        const returnVal = msg.client.queues.get(msg.guild).clear();
        return msg.channel.send(returnVal ? {embed:{color:0xe83f3f, description:returnVal}} : {embed:{color:0x22e34c,description:'Successfully cleared...'}});
    }
}
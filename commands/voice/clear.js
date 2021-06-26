module.exports = { 
    name:'clear',
    alias: ['empty', 'clearqueue', 'cq'],
    description:'Clears all the songs from the queue.',
    args:false,
    guildOnly:true,
    async execute(msg, args){
        if(!msg.client.queues.has(msg.guild)) return msg.channel.send('The queue is empty.');
        const returnVal = msg.client.queues.get(msg.guild).clear();
        return msg.channel.send(returnVal || 'Successfully cleared...');
    }
}
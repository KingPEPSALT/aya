module.exports = {
    name: 'resume',
    alias: ['carryon'],
    description: 'Resumes the currently paused audio.',
    args:false,
    guildOnly:true,
    async execute(msg, args){
        if(!msg.client.queues.has(msg.guild)) return msg.channel.send('Nothing is playing');
        const returnVal = msg.client.queues.get(msg.guild).resume();
        return msg.channel.send(returnVal || 'Successfully resumed...');
    }
}
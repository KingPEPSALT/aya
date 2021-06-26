module.exports = {
    name:'nowplaying',
    description: 'Tells you what song is playing and how long you have been listening to it for.',
    alias:['np'],
    args:false,
    guildOnly:true,
    async execute(msg,args){

        if(!msg.client.queues.has(msg.guild)) return msg.channel.send("I'm not playing anything...");

        const info = msg.client.queues.get(msg.guild).nowPlaying();

        if(!info) return msg.channel.send("I'm not playing anything...");

        const elapsedSeconds = Math.floor(msg.client.queues.get(msg.guild).currentElapsedTime()/1000);

        return msg.channel.send(`**Playing** \`${info.title} - ${info.channel}\`\n\`${info.url}\`\n\`${Math.floor(elapsedSeconds)<10 ? 0:''}${Math.floor(elapsedSeconds/60)}:${elapsedSeconds%60<10 ? 0:''}${elapsedSeconds%60}/${info.formattedLength()}\``);
    }
}
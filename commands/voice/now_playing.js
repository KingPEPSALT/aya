// error red: 0xe83f3f
// success green: 0x22e34c
module.exports = {
    name:'nowplaying',
    description: 'Tells you what song is playing and how long you have been listening to it for.',
    alias:['np'],
    args:false,
    guildOnly:true,
    async execute(msg,args){

        if(!msg.client.queues.has(msg.guild)) return msg.channel.send({embed:{color:0xe83f3f, description:"I'm not playing anything."}});

        const song = msg.client.queues.get(msg.guild).nowPlaying();

        if(!song) return msg.channel.send({embed:{color:0xe83f3f, description:"I'm not playing anything."}});

        const elapsedSeconds = Math.floor(msg.client.queues.get(msg.guild).currentElapsedTime()/1000);
        const formattedElapsed = `${Math.floor(elapsedSeconds/60)<10?0:''}${Math.floor(elapsedSeconds/60)}:${elapsedSeconds%60<10?0:''}${elapsedSeconds%60}`;
        const now_playing_message = msg.channel.send({embed:{
            color:0x22e34c,
            fields:[
                {
                    name: '♪ Now Playing ♪',
                    value: `[${song.title} - ${song.channel}](${song.url})`
                },
                {
                    name:'\u200B',
                    value:`\`${formattedElapsed}/${song.formattedLength()}\``
                },
                {
                    name:'\u200B',
                    value:`\`Requested by ${song.requester.tag}\``
                }
            ],
            thumbnail:song.image
        }});
        return now_playing_message;
    }
}
const Discord = require("discord.js");
const ytdl = require('ytdl-core-discord');
const SongInformation = require('../../song_objects/SongInformation');
const GuildMusicController = require('../../song_objects/GuildMusicController');

module.exports = {
    name:'play',
    alias:['summon','join', 'p', 'connect'],
    description: 'Plays a youtube video in the voice chat you are currently in.',
    args: true,
    usage: '<url>',
    guildOnly: true,
    async execute(msg, args){
        if(!msg.member.voice.channel) return msg.channel.send("You aren't in a voice channel.");
        await msg.member.voice.channel.join();

        const song = new SongInformation(await ytdl.getInfo(args[0]))
        if(!msg.client.queues.has(msg.guild)){ 
            msg.client.queues.set(msg.guild, new GuildMusicController(msg.guild.voice, [song]))
        }
        else {
            msg.client.queues.get(msg.guild).enqueue(song)
        }
        
        const playing_message = await msg.channel.send(`Playing \`${song.title} - ${song.channel}\`\n${args[0]}`)
        msg.delete();        
        return playing_message;
    }
}
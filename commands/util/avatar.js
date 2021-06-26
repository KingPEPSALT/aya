//info blue 0x5dade3
const Discord = require('discord.js')
module.exports={
    name:'avatar',
    alias:['pic', 'pfp', 'icon'],
    description:'Returns the avatar of the mentioned user',
    args: false,
    guildOnly: false,
    usage: '<user>',
    async execute(msg, args){
        
        if(msg.mentions.everyone) return msg.channel.send({embed:{color:0xe83f3f,description:"You cannot get the avatar of everyone."}});
        const user = msg.mentions.users.first() || msg.author;
        if(!user) return msg.channel.send({embed:{color:0xe83f3f,description:"I could not find that user!"}});

        return msg.channel.send({embed:{color:0x5dade3, description:`__${user.username}'s avatar__`, image:{url:user.displayAvatarURL({ format: 'png', dynamic:true, size: 512 })}}})
    }
}

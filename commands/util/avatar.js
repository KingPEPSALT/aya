const Discord = require('discord.js')
module.exports={
    name:'avatar',
    alias:['pic', 'pfp', 'icon'],
    description:'Returns the avatar of the mentioned user',
    args: false,
    guildOnly: false,
    usage: '<user>',
    async execute(msg, args){
        
        if(msg.mentions.everyone) return msg.channel.send("You cannot get the avatar of everyone.");
        const user = msg.mentions.users.first() || msg.author;
        if(!user) return msg.channel.send("There was an error");

        return msg.channel.send(new Discord.MessageEmbed().setTitle(`${user.username}'s avatar`).setImage(user.displayAvatarURL({ format: 'png', dynamic:true, size: 512 })
            )
        )

    }
}

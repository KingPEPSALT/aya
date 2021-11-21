const User = require("../../xp_database/db_objects");

module.exports = {
    name:'xp',
    alias: ['lvl', 'lv', 'level', 'experience'],
    description: 'Shows the experience of you or the mentioned user.',
    usage: `<user>`,
    args:false,
    guildOnly: false,
    async execute(msg, args){
        const target = msg.mentions.users.first() || msg.author;
        const user = await User.findOne({where: {user_id:target.id}});

        return msg.channel.send({embed:{
            color: 0x5dade3,
            title: `Experience`,
            description:`\`${target.tag}\` has \`${user.experience}\` XP.`}
        });
    }
}
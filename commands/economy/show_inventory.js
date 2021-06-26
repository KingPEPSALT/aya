const { Users } = require("../../economy_database/db_objects");

module.exports = {
    name:'inventory',
    alias: ['inv', 'backpack', 'bag'],
    description: 'Shows you what the mention person (or you) have in your inventory.',
    usage: `<user>`,
    args:false,
    guildOnly: false,
    async execute(msg, args){
        const target = msg.mentions.users.first() || msg.author;
        const user = await Users.findOne({where: {user_id:target.id}});
        const items = await user.getItems();

        if(!items.length) return msg.channel.send(`${target.tag} has nothing!`);
        return msg.channel.send(`${target.tag} has:\n${items.map(i => `${i.amount}x \`${i.item.name}\``).join('\n')}`);
    }
}
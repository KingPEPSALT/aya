
module.exports = {
    name:'balance',
    alias: ['bal', 'wallet', 'money'],
    description: 'Shows you how much money the mention person (or you) have in your balance.',
    usage: `<user>`,
    args:false,
    guildOnly: false,
    async execute(msg, args){
        const target = msg.mentions.users.first() || msg.author;
        return msg.channel.send(`${target.tag} has £${msg.client.currency.getBalance(target.id)}`);
    }
}
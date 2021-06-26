module.exports = {
    name:'get',
    alias:['getmoney', 'work'],
    description: 'testing command to give myself money',
    args: true,
    usage: '<amount>',
    guildOnly: false,
    async execute(msg, args){
        if(!args[0] || isNaN(args[0])) return msg.channel.send("That is not a valid number.");
        msg.client.currency.add(msg.author.id, Number(args[0]));
        return msg.channel.send(`Successfully added £${args[0]} to your balance.`);
    }
}
const { Users, CurrencyShop } = require("../../economy_database/db_objects");

const { Op } = require('sequelize');

module.exports = {
    name:'buy',
    alias:['buy_item'],
    description:'Buys an item of your choice.',
    args:true,
    guildOnly:false,
    async execute(msg, args){
        const item = await CurrencyShop.findOne({where:{name: {[Op.like]:args.join(' ')}}})
        if(!item) return msg.channel.send(`That item doesn't exist.`)

        if(item.cost > msg.client.currency.getBalance(msg.author.id)) return msg.channel.send("You don't have enough money for that.");

        const user = await Users.findOne({where: {user_id:msg.author.id}});
        msg.client.currency.add(msg.author.id, -item.cost);
        await user.addItem(item);

        msg.channel.send(`You've bought ${item.name}.`);

    }
}
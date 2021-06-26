const { CurrencyShop } = require("../../economy_database/db_objects");

module.exports = {
    name:'shop',
    alias:['showshop'],
    description:'Shows the shop!',
    args:false,
    guildOnly:false,
    async execute(msg, args){
        const items = await CurrencyShop.findAll();
        return msg.channel.send(items.map(i => `${i.name}: £${i.cost}`).join('\n'), {code:true});
    }
}
const { CurrencyShop } = require("../../economy_database/db_objects");

module.exports = {
    name:'shop',
    alias:['showshop'],
    description:'Shows the shop!',
    args:false,
    guildOnly:false,
    async execute(msg, args){
        const items = await CurrencyShop.findAll();
        return msg.channel.send({embed:{
            color:0x5dade3,
            title:'Shop',
            
            fields:items.map(i => ({
                name:'\u200B',
                value:`\`${i.name}\`: £${i.cost}`
            }))
        }});
    }
}
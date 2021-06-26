
module.exports = {
    name:'pay',
    alias:['transfer', 'pay'],
    description:'Gives the payee some of your money.',
    args:true,
    guildOnly:true,
    usage:'<user> <amount>',
    async execute(msg, args){
        const authorAmount = msg.client.currency.getBalance(msg.author.id);
        const transferAmount = args.join(' ').split(/ +g/).find(arg=>!/<@!?\d+>/g.test(arg));
        const target = msg.mentions.users.first();
        if(!transferAmount || isNaN(transferAmount)) return msg.channel.send({embed:{color:0xe83f3f,description:"That is an invalid amount."}});
        if(transferAmount > authorAmount) return msg.channel.send({embed:{color:0xe83f3f,description:"You can't transfer more than you have."}});
        if(!target) return msg.channel.send({embed:{color:0xe83f3f,description:"That isn't a person."}});
        if(transferAmount < 0) return msg.channel.send({embed:{color:0xe83f3f,description:`Stop trying to rob ${target.tag}`}});

        msg.client.currency.add(msg.author.id, -transferAmount);
        msg.client.currency.add(target.id, transferAmount);

        return msg.channel.send({embed:{color:green,description:`Successfully transferred £${transferAmount} from ${msg.author.tag} to ${target.tag}`}});
        


    }

}
module.exports = {
    name: 'purge',
    alias: ['bulkdelete', 'prune','delete'],
    description: 'Mass deletes up to 100 messages a time.',
    usage: '<amount>',
    args: true,
    guildOnly: true,
    permissions: ['MANAGE_MESSAGES'],
    async execute(msg, args){
        const amount = parseInt(args[0]);
        if(!amount) 
            return msg.channel.send("That isn't a valid amount.")
                .catch(console.error);
        if(amount > 100 || amount < 0)
            return msg.channel.send("0-100 please.")
                .catch(console.error);
        msg.channel.bulkDelete(amount)
            .catch(console.error);
        return msg.channel.send(`Succesfully deleted ${amount} messages.`)
            .then(async (conf)=>{
                await new Promise(resolve => setTimeout(resolve, 3000))
                conf.delete();
            })
        
    }
}
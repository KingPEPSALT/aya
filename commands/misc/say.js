module.exports = {
    name: 'say',
    alias:['repeat'],
    description: 'I will repeat what you want me to say!',
    args: true,
    guildOnly: false,
    usage: '<text>',
    async execute(msg, args){
        msg.delete();
        return msg.channel.send(args.join(' '))
    
    } 
}
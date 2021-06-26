
const {prefix} = require('../../config.json');
module.exports = {
    name:'help',
    alias: ['commands'],
    args:false,
    guildOnly:false,
    description:'Lists all of my commands.',
    usage: '<command name>',
    
    async execute(msg, args){
        const data = [];
        if(args[0]) {
            if(!msg.client.commands.has(args[0])) return msg.channel.send("That isn't a command sorry.");
            const command = msg.client.commands.get(args[0])
            data.push(`\`${command.name}\` - \`${prefix}${command.name} ${command.usage || ''}\` - ${command.description}`);
        }
        else {data.push(msg.client.commands.map(command => `\`${command.name}\` - \`${prefix}${command.name} ${command.usage || ''}\` - ${command.description}`).join('\n')) };

        return msg.channel.send(data, {split:true});
    }
}
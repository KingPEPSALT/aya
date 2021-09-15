
const {prefix} = require('../../config.json');
const fs = require('fs')

module.exports = {
    name:'help',
    alias: ['commands'],
    args:false,
    guildOnly:false,
    description:'Lists all of my commands.',
    usage: '<command name>',
    
    async execute(msg, args){
        let string = ``

        if(args[0]) {
            if(!msg.client.commands.has(args[0])) return msg.channel.send({embed:{color:0xe83f3f, description:"That isn't a command sorry."}});
            const command = msg.client.commands.get(args[0])
            return msg.channel.send({embed:{color:0x5dade3, description:`\`${prefix}${command.name}${command.usage ? ' '+command.usage : ''}\` | ${command.description}`}});
        }
        else {

            const commandFolders = fs.readdirSync('./commands');
            for (const folder of commandFolders) {
                string += `**${folder.toUpperCase()}** -`
                const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
                for (const file of commandFiles) {
                    const command = require(`../${folder}/${file}`);
                    string += ` \`${command.name}\``;
                }
                string += `\n`;
            }
            string += `*For help on a command* - \`${prefix}help <command>\``

        };

        return msg.channel.send({embed:{
            title:'Commands',
            color: 0x5dade3,
            description:string,
            footer: `Made by [PEPSALT](https://github.com/KingPEPSALT/aya).`
        }});
    }
}
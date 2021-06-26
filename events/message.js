const {prefix} = require('../config.json')
module.exports = {
    name: 'message',
    execute(msg, client){
        if(!msg.content.startsWith(prefix) || msg.author.bot) return;

        const args = msg.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase(); // grabs the first element of args as the command and remvoes it

        

        const command = client.commands.get(commandName) || client.commands.find(cmd=>cmd.alias && cmd.alias.includes(commandName));

        if(!command) return;

        if (command.args && !args.length) return msg.channel.send('You didnt provide any arguments.');
        if (command.guildOnly && msg.channel.type == 'dm') return msg.channel.send('You cannot use this command in DMs.');
        if (command.permissions) if(!command.permissions.every(element => msg.member.hasPermission(element))) return msg.reply(`You don\'t have the correct permissions: \`${command.permissions.join("` `")}\``)

        command.execute(msg, args).catch(e=>{
            console.error(e);
            msg.reply("There was an error executing that command!");
        })

    }
}
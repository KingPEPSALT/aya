const { prefix } = require("../config.json");
const chalk = require("chalk");
const Discord = require("discord.js");
module.exports = {
  name: "message",
  execute(msg, client) {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    if (!args) return;
    const commandName = args.shift().toLowerCase();

    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.alias && cmd.alias.includes(commandName)
      );

    if (!command) return;

    if (command.args && !args.length)
      return msg.channel.send({
        embed: {
          color: 0xe83f3f,
          description: `You didnt provide any arguments.\nUsage:\`${prefix}${command.name} ${command.usage}`,
        },
      });
    if (command.guildOnly && msg.channel.type == "dm")
      return msg.channel.send({
        embed: {
          color: 0xe83f3f,
          description: "You cannot use this command in DMs.",
        },
      });
    if (command.permissions)
      if (
        !command.permissions.every((element) =>
          msg.member.hasPermission(element)
        )
      )
        return msg.reply({
          embed: {
            color: 0xe83f3f,
            description: `You don\'t have the correct permissions: \`${command.permissions.join(
              "` `"
            )}\``,
          },
        });

    if (!client.cooldowns.has(command.name)) {
      client.cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = client.cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 0) * 1000;
    if (timestamps.has(msg.author.id)) {
      const expiration = timestamps.get(command.name) + cooldownAmount;
      if (now < expiration) {
        const remaining = (expiration - now) / 1000;
        return msg.reply({
          embed: {
            description: `Please wait ${remaining.toFixed(
              1
            )} seconds before trying that command again!`,
            color: 0xe83f3f,
          },
        });
      }
    }

    timestamps.set(msg.author.id, now);
    setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

    command.execute(msg, args).catch((e) => {
      console.log(chalk.redBright("[ERROR] "), e);
      msg.reply({
        embed: {
          color: 0x570000,
          description: `There's been a fatal error!\n__Error__ \`[${e.name}]\` whilst executing \`${command.name}\``,
          footer: `Don't worry this is my fault and my developer is fixing it!`,
        },
      });
    });
  },
};

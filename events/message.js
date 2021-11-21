const { prefix } = require("../config.json");
const chalk = require("chalk");
const Discord = require("discord.js");
const User = require("../xp_database/db_objects")

const Sequelize = require('sequelize');
module.exports = {
  name: "message",
  async execute(msg, client) {

    if(msg.author.bot) return;

    let user = await User.findOne({
      where:{user_id:msg.author.id}
    });
    if(!user) user = client.experiences.add(msg.author.id, 0, msg.createdTimestamp);
    else{
      const ms = new Date(msg.createdTimestamp).getTime() - new Date(user.last_message_time).getTime();
      if(ms > 2000){
        const experience = Math.floor(Math.max(0, Math.min( Math.pow(ms/800, 0.9), 1000 ))); // clamps number between 0-660 (roughly 1 day of waiting)
        client.experiences.add(msg.author.id, experience, msg.createdTimestamp);
      }
    }

    if (!msg.content.startsWith(prefix)) return;

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
          fields: [
            {
              name: "Fatal Error!",
              value: `There's been a fatal error!\n__Error__ \`[${e.name}]\` whilst executing \`${command.name}\``,
            },
            {
              name: "\u200B",
              value: `\`Don't worry this is my fault and my developer is fixing it!\``,
              inline: true,
            },
          ],
        },
      });
    });
  },
};

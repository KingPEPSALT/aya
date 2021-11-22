const filesystem = require("fs");

const Discord = require("discord.js");
const { token } = require("./config.json");
const User = require("./xp_database/db_objects");
const chalk = require("chalk");

const client = new Discord.Client();

client.commands = new Discord.Collection();
client.experiences = new Discord.Collection();
client.queues = new Discord.Collection();
client.cooldowns = new Discord.Collection();

Reflect.defineProperty(client.experiences, "add", {
  value: async function add(id, amount, timestamp) {
    const user = await client.experiences.get(id);
    if (user) {
      user.experience += Number(amount);
      user.last_message_time = timestamp;
      return user.save();
    }
    const newUser = await User.create({ user_id: id, experience:amount, last_message_time: timestamp}).catch(console.error);
    await client.experiences.set(id, newUser);
    return newUser;
  },
});
Reflect.defineProperty(client.experiences, "getExperience", {
  value: async function getBalance(id) {
    const user = await client.experiences.get(id);
    return user
      ? user.experience
      : await User.create({ user_id: id, experience: 0, last_message_time: new Date().toString() }).then(user => user.experience).catch(console.error);
  },
});

const commandFolders = filesystem.readdirSync("./commands");

for (const folder of commandFolders) {
  const commandFiles = filesystem
    .readdirSync(`./commands/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

const eventFiles = filesystem
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

process.on("uncaughtException", (e) => {
  console.log(chalk.white.bgRed("FATAL"), e);
});

client.login(token);

const filesystem = require('fs');

const Discord = require('discord.js');
const { token } = require('./config.json');
const { Users } = require('./economy_database/db_objects');
const chalk = require('chalk')

const client = new Discord.Client()


client.commands = new Discord.Collection();
client.currency = new Discord.Collection();
client.queues = new Discord.Collection();

Reflect.defineProperty(client.currency, 'add', {
    value: async function add(id, amount){
        const user = client.currency.get(id);
        if (user){
            user.balance += Number(amount);
            return user.save();
        }
        const newUser = await Users.create({user_id:id, balance:amount+10});
        client.currency.set(id, newUser);
        return newUser;
    }
});
Reflect.defineProperty(client.currency, 'getBalance', {
    value: async function getBalance(id){
        const user = client.currency.get(id);
        return user ? user.balance : await Users.create({user_id:id, balance:10}).balance;
    }
});


const commandFolders = filesystem.readdirSync('./commands');


for (const folder of commandFolders) {
	const commandFiles = filesystem.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}


const eventFiles = filesystem.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles){
    const event = require(`./events/${file}`);
    if (event.once) {client.once(event.name, (...args) => event.execute(...args, client)) }
    else { client.on(event.name, (...args) => event.execute(...args, client)) };
}

process.on('uncaughtException', e=>{
    console.log(chalk.white.redBg('FATAL'), e);
});

client.login(token);

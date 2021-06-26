module.exports = {
    name: 'ping',
    alias: 'latency',
    description: 'Pings the server I\'m being run on and returns the latency in ms.',
    args: false,
    guildOnly: false,
    async execute(msg, args){
        return msg.channel.send('Pong!').then(async (pong)=>{
            pong.delete();
            msg.channel.send({embed:{color:0x5dade3, description:`There was a latency of ${pong.createdTimestamp-msg.createdTimestamp}ms.`, footer:`API latency: ${Math.round(msg.client.ws.ping)}ms.`}})
                .catch(e=>console.log(chalk.brightRed('[ERROR] '), e));
        });
    }
}

module.exports = {
    name: 'ping',
    alias: 'latency',
    description: 'Pings the server I\'m being run on and returns the latency in ms',
    args: false,
    guildOnly: false,
    async execute(msg, args){
        return msg.channel.send('Pong!').then(async (pong)=>{
            pong.delete();
            msg.channel.send(`There was a latency of ${pong.createdTimestamp-msg.createdTimestamp}ms. API latency: ${Math.round(msg.client.ws.ping)}ms.`)
                .catch(console.error);
        });
    }
}
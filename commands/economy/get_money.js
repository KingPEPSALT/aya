module.exports = {
  name: "work",
  alias: ["getmoney", "get"],
  description: "work for money!",
  guildOnly: false,
  cooldown: 100,
  async execute(msg, args) {
    msg.client.currency.add(msg.author.id, Math.floor(Math.random()*275) + 25);
    return msg.channel.send({
      embed: {
        color: 0x22e34c,
        description: `Successfully added £${args[0]} to your balance.`
      },
    });
  },
};

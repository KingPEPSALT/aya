module.exports = {
  name: "work",
  alias: ["getmoney", "get"],
  description: "work for money!",
  args: true,
  usage: "<amount>",
  guildOnly: false,
  cooldown: 100,
  async execute(msg, args) {
    if (!args[0] || isNaN(args[0]))
      return msg.channel.send({
        embed: { color: 0xe83f3f, description: "That is not a valid number." },
      });
    msg.client.currency.add(msg.author.id, Number(args[0]));
    return msg.channel.send({
      embed: {
        color: 0x22e34c,
        description: `Successfully added £${args[0]} to your balance.`,
        footer: `THIS IS A TEST COMMAND`,
      },
    });
  },
};

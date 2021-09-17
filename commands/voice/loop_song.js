module.exports = {
  name: "loop",
  description: "Loops the song.",
  alias: ["loopsong", "lp", "songloop"],
  args: false,
  guildOnly: true,
  execute(msg, args) {
    if (!msg.client.queues.has(msg.guild))
      return msg.channel.send({
        embed: { color: 0xe83f3f, description: "There is no queue." },
      });
    returnVal = msg.client.queues.get(msg.guild).loop()
      ? "Looped!"
      : "Unlooped!";
    return msg.channel.send({
      embed: { color: 0x22e34c, description: returnVal },
    });
  },
};

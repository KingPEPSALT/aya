module.exports = {
  name: "loopqueue",
  description: "Loops the queue.",
  alias: ["lq", "loopq", "qloop", "ql"],
  args: false,
  guildOnly: true,
  execute(msg, args) {
    if (!msg.client.queues.has(msg.guild))
      return msg.channel.send({
        embed: { color: 0xe83f3f, description: "The queue is empty." },
      });
    returnVal = msg.client.queues.get(msg.guild).queueLoop()
      ? "Queue is looped!"
      : "Queue is unlooped!";
    return msg.channel.send({
      embed: { color: 0x22e34c, description: returnVal },
    });
  },
};

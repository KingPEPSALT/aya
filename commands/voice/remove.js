module.exports = {
  name: "remove",
  alias: ["rem", "delete", "r", "rm"],
  description: "Removes a song from the queue.",
  args: true,
  usage: "<song number>",
  guildOnly: true,
  execute(msg, args) {
    if (!msg.client.queues.has(msg.guild))
      return msg.channel.send({
        embed: { color: 0xe83f3f, description: "The queue is empty." },
      });
    var idx = parseInt(args[0]);

    returnVal = msg.client.queues.get(msg.guild).remove(idx - 1) || null;
    return msg.channel.send(
      returnVal == null
        ? {
            embed: {
              color: 0x22e34c,
              description: `Successfully removed song \`${idx}\` from the queue`,
            },
          }
        : {
            embed: { color: 0xe83f3f, description: returnVal },
          }
    );
  },
};

const { info } = require("winston");

module.exports = {
  name: "move",
  description: "Swaps two songs in the queue!",
  alias: ["mov", "mv", "swap", "swp"],
  args: true,
  guildOnly: true,
  usage: "<song A number> <song B number>",
  execute(msg, args) {
    if (!msg.client.queues.has(msg.guild))
      return msg.channel.send({
        embed: { color: 0xe83f3f, description: "The queue is empty." },
      });
    returnVal = msg.client.queues.get(msg.guild).swap(args[0] - 1, args[1] - 1);
    return msg.channel.send(
      returnVal == null
        ? {
            embed: {
              color: 0x22e34c,
              description: `Successfully moved songs \`${args[0]}\` and \`${args[1]}\` in the queue`,
            },
          }
        : {
            embed: { color: 0xe83f3f, description: returnVal },
          }
    );
  },
};

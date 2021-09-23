const Discord = require("discord.js");

module.exports = {
  name: "queue",
  alias: ["q", "showqueue"],
  description: "Shows the current queue.",
  args: false,
  guildOnly: true,
  async execute(msg, args) {
    if (!msg.client.queues.has(msg.guild))
      return msg.channel.send({
        embed: { color: 0xe83f3f, description: "The queue is empty." },
      });
    const pages = msg.client.queues.get(msg.guild).displayQueue();
    console.log(pages);
    var embeds = [];
    var i = 1;
    for (const page of pages) {
      const fields = page.map((val, idx) => ({
        name: idx == 0 && i == pages.length ? "♪__Playing__♪" : "\u200b",
        value: val,
        inline: false,
      }));
      embeds.push({
        color: 0x5dade3,
        title: `${msg.guild.name} queue.`,
        fields: fields,
      });
      i++;
    }
    console.log(embeds);
    for (const embed of embeds.reverse())
      await msg.channel.send({ embed: embed });
    return msg.channel.lastMessage;
  },
};

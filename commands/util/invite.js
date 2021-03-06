module.exports = {
  name: "invite",
  alias: ["link"],
  description: "Gives the invite link for me!",
  args: false,
  guildOnly: false,
  async execute(msg, args) {
    return msg.channel.send({
      embed: {
        color: 0x5dade3,
        description: `[💌Invite me!💌](https://discord.com/api/oauth2/authorize?client_id=${msg.client.user.id}&scope=bot)`,
      },
    });
  },
};

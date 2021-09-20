const Discord = require("discord.js");
const { getPreview } = require("spotify-url-info");
const ytdl = require("ytdl-core");
const GuildMusicController = require("../../song_objects/GuildMusicController");
const SongInformation = require("../../song_objects/SongInformation");
const ytsearch = require("youtube-search-api");

module.exports = {
  name: "play",
  alias: ["p", "pl", "summon", "join", "j", "connect", "con"],
  description: "Plays audio in the voice chat you are currently in.",
  guildOnly: true,
  args: false,
  usage: "<video>",
  async execute(msg, args) {
    if (!msg.member.voice.channel)
      return await msg.channel.send({
        embed: {
          color: 0xe83f3f,
          description: "You aren't in a voice channel",
        },
      });
    await msg.member.voice.channel.join();
    if (!args) return;

    // create song
    var search_value;
    var info_parameter;
    // check for spotify url
    if (args[0].startsWith("https://open.spotify"))
      search_value = await getPreview(args[0]).then((data) => {
        return `${data.title} ${data.artist}`;
      });
    // check for search keywords
    else if (
      !(await ytdl.validateURL(args[0])) ||
      !(await ytdl.validateID(args[0]))
    )
      search_value = args.join(" ");
    // must be yt ID/URL if not anything else
    else info_parameter = args[0];

    // requires a ytsearch
    if (search_value)
      info_parameter = await ytsearch
        .GetListByKeyword(search_value)
        .then((result) => {
          return result.items[0].id;
        });

    const song = new SongInformation(
      await ytdl.getBasicInfo(info_parameter),
      msg.author
    );
    var queue = msg.client.queues.has(msg.guild)
      ? msg.client.queues.get(msg.guild)
      : msg.client.queues
          .set(msg.guild, new GuildMusicController(msg.guild.voice))
          .get(msg.guild);
    queue.enqueue(song);

    return await msg.channel.send({
      embed: {
        color: 0x22e34c,
        fields: [
          {
            name: "♪ Playing ♪",
            value: `[${song.title} - ${song.channel}](${song.url})`,
          },
          {
            name: "\u200B",
            value: `\`${song.formattedLength()} | Requested by ${
              song.requester.tag
            }\``,
            inline: true,
          },
        ],
        thumbnail: song.image,
      },
    });
  },
};

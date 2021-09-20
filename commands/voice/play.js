const Discord = require("discord.js");
const ytdl = require("../../song_objects/ytdl-discord");
const SongInformation = require("../../song_objects/SongInformation");
const GuildMusicController = require("../../song_objects/GuildMusicController");
const ytsearch = require("youtube-search-api");
const { getData, getPreview, getTracks } = require("spotify-url-info");
const { getInfo } = require("ytdl-core");
module.exports = {
  name: "play",
  alias: ["summon", "join", "p", "connect"],
  description: "Plays a youtube video in the voice chat you are currently in.",
  args: true,
  usage: "<url>",
  guildOnly: true,
  async execute(msg, args) {
    if (!msg.member.voice.channel)
      return msg.channel.send({
        embed: {
          color: 0xe83f3f,
          description: "You aren't in a voice channel.",
        },
      });
    await msg.member.voice.channel.join();
    var getInfoParam = args[0];
    if (getInfoParam.startsWith("https://open.spotify")) {
      var getInfoParam = await getPreview(getInfoParam).then((data) => {
        return data.title + " " + data.artist;
      });
      spotify = true;
    }

    if (
      !(await ytdl.validateURL(getInfoParam)) ||
      !(await ytdl.validateID(getInfoParam))
    )
      getInfoParam = await ytsearch
        .GetListByKeyword(spotify ? getInfoParam : args.join(" "))
        .then((result) => {
          return result.items[0].id;
        });

    const song = new SongInformation(
      await ytdl.getBasicInfo(getInfoParam),
      msg.author
    );

    if (!msg.client.queues.has(msg.guild)) {
      msg.client.queues.set(
        msg.guild,
        new GuildMusicController(msg.guild.voice, [song])
      );
    } else {
      msg.client.queues.get(msg.guild).enqueue(song);
    }

    const playing_message = await msg.channel.send({
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
    msg.delete();
    return playing_message;
  },
};

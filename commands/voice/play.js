const Discord = require("discord.js");
const { getPreview } = require("spotify-url-info");
const ytdl = require("ytdl-core");
const GuildMusicController = require("../../song_objects/GuildMusicController");
const SongInformation = require("../../song_objects/SongInformation");
const ytsearch = require("youtube-search-api");
const {
  isYoutubeIDURL,
  isSpotifyUrl,
  getSearchStringFromSpotify,
  searchForSong,
} = require("../../song_objects/SongUtil");
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
    var search_str;
    var info_parameter;
    if (await isYoutubeIDURL(args[0])) info_parameter = args[0];
    else {
      if (await isSpotifyUrl(args[0]))
        search_str = await getSearchStringFromSpotify(args[0]);
      else search_str = args.join(" ");
      info_parameter = await searchForSong(search_str);
    }
    const song = new SongInformation(
      await ytdl.getBasicInfo(info_parameter),
      msg.author
    );
    const queue = msg.client.queues.has(msg.guild)
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
            value: `\`${queue.length()}.\` [${song.title} - ${song.channel}](${
              song.url
            })`,
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

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
  isYTPlaylist,
  getYTPlaylistIDs,
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
    // console.log("YTPL ID/URL: " + (await isYTPlaylist(args[0])));
    // console.log("YTDL ID/URL: " + (await isYoutubeIDURL(args[0])));
    // create song
    var search_str;
    var info_parameters;
    if (await isYTPlaylist(args[0]))
      info_parameters = await getYTPlaylistIDs(args[0]);
    else if (await isYoutubeIDURL(args[0])) info_parameters = [args[0]];
    else {
      if (await isSpotifyUrl(args[0]))
        search_str = await getSearchStringFromSpotify(args[0]);
      else search_str = args.join(" ");
      info_parameters = [await searchForSong(search_str)];
    }
    var songs = [];
    for (const param of info_parameters)
      songs.push(
        new SongInformation(await ytdl.getBasicInfo(param), msg.author)
      );

    const queue = msg.client.queues.has(msg.guild)
      ? msg.client.queues.get(msg.guild)
      : msg.client.queues
          .set(msg.guild, new GuildMusicController(msg.guild.voice))
          .get(msg.guild);
    await queue.enqueue_list(songs);
    msg.client.queues.get(msg.guild).dispatcherStatus();
    return await msg.channel.send({
      embed: {
        color: 0x22e34c,
        fields: [
          {
            name: "♪ Playing ♪",
            value: `\`${queue.length()}.\` [${songs[0].title} - ${
              songs[0].channel
            }](${songs[0].url})`,
          },
          {
            name: "\u200B",
            value: `\`${songs[0].formattedLength()} | Requested by ${
              songs[0].requester.tag
            }\``,
            inline: true,
          },
        ],
        thumbnail: songs[0].image,
      },
    });
  },
};

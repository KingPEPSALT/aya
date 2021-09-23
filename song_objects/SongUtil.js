const { getPreview } = require("spotify-url-info");
const { getURLVideoID } = require("ytdl-core");
const ytdl = require("ytdl-core");
const ytsearch = require("youtube-search-api");
const ytpl = require("ytpl");
module.exports = {
  async isYoutubeIDURL(id_url) {
    return (await ytdl.validateID(id_url)) || (await ytdl.validateURL(id_url));
  },
  async isSpotifyUrl(url) {
    return url.startsWith("https://open.spotify");
  },
  async getSearchStringFromSpotify(url) {
    return await getPreview(url).then((data) => {
      return `${data.title} ${data.artist}`;
    });
  },
  async searchForSong(search_param) {
    return await ytsearch.GetListByKeyword(search_param).then((result) => {
      return result.items[0].id;
    });
  },

  async isYTPlaylist(id_url) {
    return await ytpl.validateID(id_url);
  },

  async getYTPlaylistIDs(id_url) {
    return (await ytpl(id_url)).items.map((a) => a.id);
  },
};

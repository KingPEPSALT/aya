module.exports = class SongInformation {
  constructor(songInfo, requester) {
    this.title = songInfo.videoDetails.title;
    this.channel = songInfo.videoDetails.ownerChannelName;
    this.url = songInfo.videoDetails.video_url;
    this.length = songInfo.videoDetails.lengthSeconds;
    this.image = songInfo.videoDetails.thumbnails[0];
    this.requester = requester;
  }

  formattedLength() {
    // Stolen from stack overflow: https://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript
    var sec_num = parseInt(secs, 10)
    var hours   = Math.floor(sec_num / 3600)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60

    return [hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => v !== "00" || i > 0)
        .join(":");
  }
};

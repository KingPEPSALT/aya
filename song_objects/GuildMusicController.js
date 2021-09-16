const { exceptions } = require("winston");
const ytdl = require("./ytdl-discord");
module.exports = class GuildMusicController {
  constructor(voiceState, queue) {
    this.voice = voiceState;
    this.queue = queue || [];
    this.paused = queue.length == 0 ? true : false;
    if (!this.paused) this.playTop();
  }

  async playTop() {
    console.log(this.queue[0]);
    const dispatcher = this.voice.connection.play(
      await ytdl(this.queue[0].url).catch((e) => {
        throw new Error("Invalid URL: " + this.queue[0].url + " | " + e);
      }),
      { type: "opus", highWaterMark: 100, volume: false }
    );
    if (this.paused) this.pause();
    dispatcher.once("finish", () => {
      if (this.queue.length == 0) return dispatcher.destroy();
      this.skip();
    });
  }

  skip() {
    if (this.queue.length == 0) return "The queue is empty.";
    this.queue.shift();
    if (!this.queue.length == 0) {
      this.playTop();
    }
  }

  enqueue(song) {
    this.queue.push(song);
    if (this.queue.length == 1) this.playTop();
  }

  remove(idx) {
    if (idx >= this.queue.length || idx < 1) return "That is an invalid song.";
    this.queue.splice(1, idx);
  }

  clear() {
    this.queue = [this.queue[0]];
  }

  nowPlaying() {
    return this.queue[0] || null;
  }

  pause() {
    if (!this.nowPlaying()) return "Nothing is playing.";
    if (this.paused) return "It is already paused.";
    this.voice.connection.dispatcher.pause(true);
    this.paused = true;
  }

  resume() {
    if (!this.nowPlaying()) return "Nothing is playing.";
    if (!this.paused) return "It isn't paused.";
    this.voice.connection.dispatcher.resume();
    this.paused = false;
  }

  currentElapsedTime() {
    if (!this.nowPlaying()) return "Nothing is playing.";
    return (
      this.voice.connection.dispatcher.streamTime -
      this.voice.connection.dispatcher.pausedTime
    );
  }

  displayQueue() {
    if (this.queue.length == 0) return "The queue is empty.";
    return this.queue
      .map(
        (song, position) =>
          `${position + 1} | ${song.title} - ${
            song.channel
          } | Length: ${song.formattedLength()}`
      )
      .join("\n");
  }
};

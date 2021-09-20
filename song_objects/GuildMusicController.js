const { exceptions } = require("winston");
const ytdl = require("./ytdl-discord");
module.exports = class GuildMusicController {
  constructor(voiceState, queue = []) {
    this.voice = voiceState;
    this.queue = queue;
    this.paused = queue.length == 0 ? true : false;

    this.loopQueue = false;
    this.loopSong = false;

    if (!this.paused) this.playTop();
  }

  queueLoop() {
    return (this.loopQueue = !this.loopQueue);
  }

  loop() {
    return (this.loopSong = !this.loopSong);
  }

  async playTop() {
    if (this.dispatcher != null) this.dispatcher.destroy();
    this.dispatcher = this.voice.connection.play(
      await ytdl(this.queue[0].url).catch((e) => {
        throw new Error("Invalid URL: " + this.queue[0].url + " | " + e);
      }),
      { type: "opus", highWaterMark: 100, volume: false }
    );
    if (this.paused) this.pause();
    this.dispatcher.once("finish", () => {
      if (this.loopSong) return this.playTop();
      if (this.loopQueue) {
        this.enqueue(this.queue.shift());
        return this.playTop();
      }
      this.skip();
    });
  }

  nowPlaying() {
    return this.queue[0] || null;
  }

  skip() {
    if (this.queue.length == 0) return "The queue is empty.";
    if (this.queue.length == 1) this.dispatcher.destroy();
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
    if (idx >= this.queue.length || idx < 0 || isNaN(idx))
      return "That is an invalid song.";
    if (idx == 0) this.dispatcher.destroy();
    this.queue.splice(idx, 1);
    console.log("done!");
  }

  clear() {
    this.queue = [this.queue[0]];
  }
  swap(idxA, idxB) {
    if (idxA == idxB) return;
    if (this.empty()) return "The queue is empty.";
    if (
      idxA >= this.queue.length ||
      idxB >= this.queue.length ||
      idxB < 0 ||
      idxA < 0 ||
      isNaN(idxA) ||
      isNaN(idxB)
    )
      return "That song doesn't exist!";
    var temporary = this.queue[idxA];
    this.queue[idxA] = this.queue[idxB];
    this.queue[idxB] = temporary;
    if (idxA == 0 || idxB == 0) this.playTop();
  }
  pause() {
    if (this.empty()) return "Nothing is playing.";
    if (this.paused) return "It is already paused.";
    this.voice.connection.dispatcher.pause(true);
    this.paused = true;
  }

  resume() {
    if (this.empty()) return "Nothing is playing.";
    if (!this.paused) return "It isn't paused.";
    this.voice.connection.dispatcher.resume();
    this.paused = false;
  }

  currentElapsedTime() {
    if (this.empty()) return "Nothing is playing.";
    return this.dispatcher.streamTime - this.dispatcher.pausedTime;
  }

  displayQueue() {
    if (this.empty()) return "The queue is empty.";
    return this.queue
      .map(
        (song, position) =>
          `${position + 1} | ${song.title} - ${
            song.channel
          } | Length: ${song.formattedLength()}`
      )
      .join("\n");
  }
  length() {
    return this.queue.length();
  }
  empty() {
    return this.queue.length == 0;
  }
};

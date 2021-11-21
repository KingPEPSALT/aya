const { exceptions } = require("winston");
const ytdl = require("./ytdl-discord");
module.exports = class GuildMusicController {
  constructor(voiceState, queue = []) {
    this.voice = voiceState;
    this.queue = queue;
    this.paused = false;

    this.loopQueue = false;
    this.loopSong = false;

    if (!this.empty()) this.playTop();
  }

  queueLoop() {
    return (this.loopQueue = !this.loopQueue);
  }

  loop() {
    return (this.loopSong = !this.loopSong);
  }

  async playTop(tried = false) {
    if (this.dispatcher != null) this.dispatcher.destroy();
    this.dispatcher = await this.voice.connection.play(
      await ytdl(this.queue[0].url).catch((e) => {
        throw new Error("Invalid URL: " + this.queue[0].url + " | " + e);
      }),
      { type: "opus", highWaterMark: 100, volume: false }
    );
    if(this.dispatcher == null && !tried) this.playTop(true); 
    if (this.paused) this.pause();
    this.dispatcher.once("finish", () => {
      if (this.loopSong) return this.playTop();
      if (this.loopQueue) {
        this.enqueue(this.queue.shift());
        this.playTop();
        return;
      }
      this.skip();
    });
  }
  dispatcherStatus(){
    console.log(this.dispatcher);
  }
  nowPlaying() {
    return this.queue[0] || null;
  }

  skip() {
    if (this.queue.length == 0) return "The queue is empty.";
    if (this.queue.length == 1) this.dispatcher.destroy();
    this.queue.shift();
    if (!this.queue.length == 0) this.playTop();

  }

  enqueue(song) {
    this.queue.push(song);
    if (this.queue.length == 1) this.playTop();
  }

  enqueue_list(songs) {
    for (const song of songs) this.enqueue(song);
  }

  remove(idx) {
    if (idx >= this.queue.length || idx < 0 || isNaN(idx))
      return "That is an invalid song.";
    if (idx == 0) this.dispatcher.destroy();
    this.queue.splice(idx, 1);
    console.log("done!");
  }

  destroy(){
    return this.dispatcher.destroy();
  }

  clear() {
    this.queue = [];
    this.dispatcher.destroy();
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
    if (this.empty() || this.voice.connection.dispatcher == null)
      return "Nothing is playing.";
    if (this.paused) return "It is already paused.";
    this.voice.connection.dispatcher.pause(true);
    this.paused = true;
  }

  resume() {
    if (this.empty() || this.voice.connection.dispatcher == null)
      return "Nothing is playing.";
    if (!this.paused) return "It isn't paused.";
    this.voice.connection.dispatcher.resume();
    this.paused = false;
  }

  currentElapsedTime() {
    if (this.empty()) return 0;
    return this.dispatcher.streamTime - this.dispatcher.pausedTime;
  }

  displayQueue() {
    if (this.empty()) return "The queue is empty.";
    var pages = [];
    for (let i = 0; i < this.length(); i += 10)
      pages.push(
        this.queue
          .slice(i, i + 10)
          .map(
            (song, idx) =>
              `\`${idx + i + 1}.\` [${song.title} - ${song.channel}](${
                song.url
              }) - \`${song.formattedLength()} | Requested by ${
                song.requester.tag
              }\``
          )
      );
    return pages.reverse();
  }
  length() {
    return this.queue.length;
  }
  empty() {
    return this.queue.length == 0;
  }
};

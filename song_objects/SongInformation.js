
module.exports = class SongInformation{

    constructor(songInfo, requester){
        this.title = songInfo.videoDetails.title;
        this.channel = songInfo.videoDetails.ownerChannelName;
        this.url = songInfo.videoDetails.video_url;
        this.length = songInfo.videoDetails.lengthSeconds;
        this.image = songInfo.videoDetails.thumbnails[0];
        this.requester = requester;
    }

    formattedLength(){
        return `${(this.length-(this.length%60))/60 < 10? 0: ''}${(this.length-(this.length%60))/60}:${this.length%60}`
    }

}
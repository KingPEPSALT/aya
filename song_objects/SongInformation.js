
module.exports = class SongInformation{

    constructor(songInfo){
        this.title = songInfo.videoDetails.title;
        this.channel = songInfo.videoDetails.ownerChannelName;
        this.url = songInfo.videoDetails.video_url;
        this.length = songInfo.videoDetails.lengthSeconds;
    }

    formattedLength(){
        return `${(this.length-(this.length%60))/60 < 10? 0: ''}${(this.length-(this.length%60))/60}:${this.length%60}`
    }

}
class MediaController {
    constructor(config, videoId, imageId, titleId, creatorId) {
        this.media = config.people;
        this.config = config
        this.position = 0;
        this.video = document.getElementById(videoId);
        if (this.config.animation) {
            this.video.src = config.animation
            this.video.loop = true
            this.video.load();
            this.video.play();
        }
        this.video.addEventListener('ended', () => {
            if (this.config.people) {
                // this.next();
                domhandler.showEndScreen()
            }
            mqtt.onPlaying(false)

        }, false);
        this.video.addEventListener('playing', ()=> {
            console.log('playing')
            mqtt.onPlaying(true)
        })


        this.image = document.getElementById(imageId);
        this.title = document.getElementById(titleId);
        this.creator = document.getElementById(creatorId);
    }
    reset() {
        this.image.src = '';
        this.video.src = '';
    }
    syncAnimation() {
        if (this.config.animation) {
            video.pause();
            video.currentTime = 0;
            video.load();
            this.video.play();
        } 
    }
    next() {
        if (this.position > this.media.length - 2) {
            this.position = 0
        } else {
            this.position = (this.position + 1);

        }
        this.show();
    }
    repeat() {
        this.show()
    }
    previous() {
        this.position = (this.position - 1);
        if (this.position < 0) {
            this.position = this.media.length - 1
        }
        this.show();

    }
    show() {
        this.reset();
        let currentItem = this.media[this.position]

        this.video.src = currentItem.path
        this.setStrings(currentItem);
        this.video.load();
        this.video.play();
    }
    setStrings(item) {
        /*this.title.innerHTML = item.title;
        this.creator.innerHTML = item.creator;*/
    }
    formatData() {

    }
    autoPlayController() {

    }
}

const MEDIA_TYPES = {
    VIDEO: Symbol(),
    IMAGE: Symbol()
}

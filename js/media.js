class MediaController {
    constructor(media, videoId, imageId, titleId, creatorId) {
        this.media = media;
        this.position = 0;
        this.mqtt = new MqttHandler('127.0.0.1', 1884, { id: '1' })
        this.mqtt.connect()

        this.video = document.getElementById(videoId);
        this.video.addEventListener('ended', () => {
            this.next();
        }, false);

        this.image = document.getElementById(imageId);
        this.title = document.getElementById(titleId);
        this.creator = document.getElementById(creatorId);
        this.show();
    }
    reset() {
        this.image.src = '';
        this.video.src = '';
        this.image.classList.remove('active');
        this.image.classList.remove('active');
    }
    next() {
        this.position = (this.position + 1) % this.media.length;
        this.show();
        this.mqtt.publishPlaying(true)
    }
    previous() {
        this.position = (this.position - 1);
        if (this.position < 0) { this.position = this.media.length - 1}
        this.show();
        this.mqtt.publishPlaying(false)
    }
    show() {
        this.reset();
        let currentItem = this.media[this.position];
        let isVideo = (currentItem.type === MEDIA_TYPES.VIDEO)
        let element = isVideo ? this.video : this.image

        element.src = currentItem.path;
        element.classList.add('active');

        this.setStrings(currentItem);
        if (isVideo) { element.load(); element.play(); }
    }
    setStrings(item) {
        this.title.innerHTML = item.title;
        this.creator.innerHTML = item.creator;
    }
}

const MEDIA_TYPES = {
    VIDEO: Symbol(),
    IMAGE: Symbol()
}

const MEDIA = [
    {
        creator: 'Django 4k Müller',
        title: '4k Footage',
        path: 'testvideos/4kfootage.mp4',
        type: MEDIA_TYPES.VIDEO
    },
    {
        creator: 'Django IBM Müller',
        title: 'IBM',
        path: 'testimages/ibm.png',
        type: MEDIA_TYPES.IMAGE
    },
    {
        creator: 'Django shitty Müller',
        title: 'Shitty Footage',
        path: 'testvideos/shitfootage.mp4',
        type: MEDIA_TYPES.VIDEO
    },
    {
        creator: 'Django Dickbutt Müller',
        title: 'Dickbutt',
        path: 'testimages/dickbutt.png',
        type: MEDIA_TYPES.IMAGE
    },
]

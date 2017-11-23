class MediaController {
    constructor(media, videoId, imageId, titleId, creatorId) {
        this.media = media;
        this.position = 0;

        this.video = document.getElementById(videoId);
        this.video.addEventListener('ended', () => {
            this.next();
        }, false);

        this.image = document.getElementById(imageId);
        this.title = document.getElementById(titleId);
        this.creator = document.getElementById(creatorId);
    }
    reset() {
        this.image.src = '';
        this.video.src = '';
    }
    next() {
        this.position = (this.position + 1) % this.media.length;
        this.show();
    }
    previous() {
        this.position = (this.position - 1);
        if (this.position < 0) { this.position = this.media.length - 1}
        this.show();
    }
    show() {
        this.reset();
        let currentItem = this.media[this.position];
        let isVideo = (currentItem.type === MEDIA_TYPES.VIDEO)
        let element = isVideo ? this.video : this.image

        element.src = currentItem.path

        this.setStrings(currentItem);
        if (isVideo) { element.load(); element.play() }
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

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
        /*this.title.innerHTML = item.title;
        this.creator.innerHTML = item.creator;*/
    }
    formatData() {

    }
    autoPlayController() {
        
    }
}

class DOMHandler {
    constructor(menuId, menuListId, playerID, playerControllerId) {
        this.menuElement = document.getElementById(menuId)
        this.menuListElement = document.getElementById(menuListId)
        this.playerElement = document.getElementById(playerID)
        this.playerControlsElement = document.getElementById(playerControllerId)
        media = MEDIA
        this.showMenu()
        this.createMenu()
    }
    showMenu() {
        this.menuElement.style.display = 'block';
        this.playerElement.style.display = 'none';
        controller.reset()
    }
    hideMenu() {
        this.menuElement.style.display = 'none';
        this.playerElement.style.display = 'block';
        
    }
    createMenu() {
        for(let element of media) {
            this.menuListElement.appendChild(this.menuItem(element.creator, element.backgroundImagePath))
        }
    }
    menuItem(name, imageURL) {
        const LINK_START_ELEMENT_STRING = `<a class="list-link" onclick="domhandler.select('${name}')">`
        const LINK_END_ELEMENT_STRING = '</a>'
        const NAME_ELEMENT_STRING = `<div class="list-name"> ${name} </div>`
        const IMAGE_ELEMENT_STRING = `<div class="list-creator-image"><img src="${imageURL}"></div>`
        const COMBINED_ELEMENT_STRING = LINK_START_ELEMENT_STRING + IMAGE_ELEMENT_STRING + NAME_ELEMENT_STRING + LINK_END_ELEMENT_STRING
        console.log(COMBINED_ELEMENT_STRING)
        let wrapper = document.createElement('li');
        wrapper.className += "column";

        wrapper.innerHTML = COMBINED_ELEMENT_STRING;
        return wrapper;
    }
    showPlayerControls(){
        this.playerControlsElement.style.display = 'block'

        this.playerControlsElement.style.opacity = 1
    
    }
    hidePlayerControls() {
        this.playerControlsElement.style.opacity = 0
        const ctx = this
        setTimeout(function() {
            ctx.playerControlsElement.style.display = 'none'
        }, 300);
    
    }
    togglePlayerControls() {
        if(this.playerControlsElement.style.opacity == 1) {
            this.hidePlayerControls()
            if(this.hasOwnProperty('hidePlayerTimeout')) {
                clearTimeout(this.hidePlayerTimeout);
            }
        }
        else {
            const ctx = this
            this.showPlayerControls()
            this.hidePlayerTimeout = setTimeout(function() {
                console.log(this.hidePlayerTimeout)
                ctx.hidePlayerControls()
            }, 3000)
        }
    }
    select(name) {
        this.hideMenu()
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
        backgroundImagePath: 'testimages/bg.jpg', 
        path: 'testimages/ibm.png',
        type: MEDIA_TYPES.VIDEO
    },
    {
        creator: 'Django IBM Müller',
        backgroundImagePath: 'testimages/bg.jpg', 
        title: 'IBM',
        path: 'testimages/ibm.png',
        type: MEDIA_TYPES.IMAGE
    },
    {
        creator: 'Django shitty Müller',
        title: 'Shitty Footage',
        path: 'testvideos/shitfootage.mp4',
        backgroundImagePath: 'testimages/bg.jpg', 
        type: MEDIA_TYPES.VIDEO
    },
    {
        creator: 'Django Dickbutt Müller',
        title: 'Dickbutt',
        path: 'testimages/dickbutt.png',
        backgroundImagePath: 'testimages/bg.jpg', 
        type: MEDIA_TYPES.IMAGE
    },
]

let media = []


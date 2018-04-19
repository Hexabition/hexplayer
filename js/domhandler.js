class DOMHandler {
    constructor(config, menuId, menuListId, playerID, playerControllerId, endScreenId) {
        this.menuElement = document.getElementById(menuId)
        this.menuListElement = document.getElementById(menuListId)
        this.playerElement = document.getElementById(playerID)
        this.playerControlsElement = document.getElementById(playerControllerId)
        this.media = config.people
        this.config = config
        if (this.config.people) {
            this.createMenu()
        } else if (config.animation) {
            this.hideMenu()
        }
    }
    showMenu() {
        this.menuElement.style.display = 'block';
        this.playerElement.style.display = 'none';
        controller.reset()
        mqtt.onPlaying(false)
    }
    hideMenu() {
        this.menuElement.style.display = 'none';
        this.playerElement.style.display = 'block';
    }
    createMenu() {
        this.showMenu()
        for (let showreel of this.media) {
            this.menuListElement.appendChild(this.menuItem(showreel.creator, showreel.backgroundImagePath))
        }
    }
    menuItem(name, imageURL) {
        const LINK_START_ELEMENT_STRING = `<a class="list-link" onclick="domhandler.select('${name}')">`
        const LINK_END_ELEMENT_STRING = '</a>'
        // const NAME_ELEMENT_STRING = `<div class="list-name"> ${name} </div>`
        const IMAGE_ELEMENT_STRING = `<div class="list-creator-image hexagon"><img src="${imageURL}"></div>`
        const COMBINED_ELEMENT_STRING = LINK_START_ELEMENT_STRING + IMAGE_ELEMENT_STRING + LINK_END_ELEMENT_STRING
        let wrapper = document.createElement('li');
        wrapper.className += "column li";
        if (this.config.people.length <= 4) {
            wrapper.className += " is-half";
        } else {
            wrapper.className += " is-one-third";

        }

        wrapper.innerHTML = COMBINED_ELEMENT_STRING;
        return wrapper;
    }
    showPlayerControls() {
        this.playerControlsElement.style.display = 'block'

        setTimeout(
            () => {
                this.playerControlsElement.style.opacity = 1

            }, 200
        )

    }
    hidePlayerControls() {
        this.playerControlsElement.style.opacity = 0
        const ctx = this
        setTimeout(function () {
            ctx.playerControlsElement.style.display = 'none'
        }, 300);

    }
    togglePlayerControls() {
        if (this.config.animation) { return }
        if (this.playerControlsElement.style.opacity == 1) {
            this.hidePlayerControls()
            if (this.hasOwnProperty('hidePlayerTimeout')) {
                clearTimeout(this.hidePlayerTimeout);
            }
        } else {
            const ctx = this
            this.showPlayerControls()

            this.hidePlayerTimeout = setTimeout(function () {
                console.log(this.hidePlayerTimeout)
                ctx.hidePlayerControls()
            }, 3000)
        }
    }
    select(name) {
        // controller.media = MEDIA.find(x => x.creator == name)
        // let test = MEDIA.findIndex(p => p.name == name)
        controller.position = this.media.findIndex(function (person) {
            return person.creator == name
        })
        console.log(controller.position)

        controller.show()
        this.hideMenu()
    }

    showEndScreen() {
        var progressValue = document.querySelector('.progress__value');
        var endscreenDOM = document.getElementById('end-screen')
        endscreenDOM.style.display = 'block'
        setTimeout(() => {
            endscreenDOM.style.opacity = 1
            endscreenDOM.style.zIndex = 9999
            var RADIUS = 54;
            var CIRCUMFERENCE = 2 * Math.PI * RADIUS;
            var ctx = this

            function progress(value) {
                var progress = value / 100;
                var dashoffset = CIRCUMFERENCE * (1 - progress);
                progressValue.style.strokeDashoffset = dashoffset;
            }

            progressValue.style.strokeDasharray = CIRCUMFERENCE;

            var num = 0;
            var perMinute = 200;
            var perSecond = perMinute / 60;


            function update() {

                num += perSecond / 10;
                if (num < 100) {
                    progress(num);
                } else {
                    ctx.showMenu()
                    ctx.hideEndScreen()
                }
            }

            this.repeatInterval = setInterval(update, 100 / perSecond);

        }, 200)
    }

    hideEndScreen() {
        var progressValue = document.querySelector('.progress__value');
        var endscreenDOM = document.getElementById('end-screen')
        var RADIUS = 54;
        var CIRCUMFERENCE = 2 * Math.PI * RADIUS;

        clearInterval(this.repeatInterval)
        progressValue.style.strokeDasharray = CIRCUMFERENCE;
        endscreenDOM.style.opacity = 0
        setTimeout(() => {
            endscreenDOM.style.display = 'none'
        }, 600)

    }

}
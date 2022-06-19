//основной скрипт галереи, импортирован в index.js

export default class Gallery {
    constructor() {
        this.home = document.querySelector('.gallery__home');
        this.libraryWatch = document.querySelector('.gallery__library--watched');
        this.libraryQueue = document.querySelector('.gallery__library--queue');
        this.errorHome = document.querySelector('.gallery__home--error');
        this.errorlibraryWatch = document.querySelector('.gallery__library--watched-error');
        this.errorlibraryQueue = document.querySelector('.gallery__library--queue-error');
        this.homeFilmlist = this.home.firstElementChild;
        this.queueFilmList = this.libraryQueue.firstElementChild;
        this.watchFilmList = this.libraryWatch.firstElementChild;
    }


    showHome() {
        this.libraryWatch.style.display = "none";
        this.libraryQueue.style.display = "none";
        this.home.style.display = "block";
        this.errorHome.style.display = "none";
    }

    showMylibraryWatch() {
        this.libraryWatch.style.display = "block";
        this.libraryQueue.style.display = "none";
        this.home.style.display = "none";
        this.errorlibraryWatch.style.display = "none";
    };

    showMylibraryQueue() {
        this.libraryWatch.style.display = "none";
        this.libraryQueue.style.display = "block";
        this.home.style.display = "none";
        this.errorlibraryQueue.style.display = "none";
    };

    showErrorHome() {
        this.homeFilmlist.style.display = "none";
        this.errorHome.style.display = "block";
    }

    showErrorlibraryWatch() {
        this.watchFilmList.style.display = "none";
        this.errorlibraryWatch.style.display = "block";
    }

    showErrorlibraryQueue() {
        this.queueFilmList.style.display = "none";
        this.errorlibraryQueue.style.display = "block";
    }
}

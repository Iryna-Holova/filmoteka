//основной скрипт галереи, импортирован в index.js

export default class Gallery {
    constructor() {
        this.refs = this.getRefs();
    }
    
    getRefs() {
        const refs = {};
        refs.home = document.querySelector('.gallery__home');
        refs.libraryWatch = document.querySelector('.gallery__library--watched');
        refs.libraryQueue = document.querySelector('.gallery__library--queue');
        refs.errorHome = document.querySelector('.gallery__home--error');
        refs.errorlibraryWatch = document.querySelector('.gallery__library--watched-error');
        refs.errorlibraryQueue = document.querySelector('.gallery__library--queue-error');
        refs.filmList = document.querySelectorAll('.film-list');

        return refs;
    }

    showHome() {
        this.refs.libraryWatch.style.display = "none";
        this.refs.libraryQueue.style.display = "none";
        this.refs.home.style.display = "block";
        this.refs.errorHome.style.display = "none";
    }

    showMylibraryWatch() {
        this.refs.libraryWatch.style.display = "block";
        this.refs.libraryQueue.style.display = "none";
        this.refs.home.style.display = "none";
        this.refs.errorlibraryWatch.style.display = "none";
    };

    showMylibraryQueue() {
        this.refs.libraryWatch.style.display = "none";
        this.refs.libraryQueue.style.display = "block";
        this.refs.home.style.display = "none";
        this.refs.errorlibraryQueue.style.display = "none";
    };

    showErrorHome() {
        this.refs.libraryWatch.style.display = "none";
        this.refs.libraryQueue.style.display = "none";
        this.refs.filmList[0].style.display = "none";
        this.refs.errorHome.style.display = "block";
    }

    showErrorlibraryWatch() {
        this.refs.home.style.display = "none";
        this.refs.libraryQueue.style.display = "none";
        this.refs.filmList[1].style.display = "none";
        this.refs.errorlibraryWatch.style.display = "block";
    }

    showErrorlibraryQueue() {
        this.refs.home.style.display = "none";
        this.refs.libraryQueue.style.display = "none";
        this.refs.filmList[3].style.display = "none";
        this.refs.errorlibraryQueue.style.display = "block";
    }
}

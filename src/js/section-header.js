export default class Header {
    constructor() {
        this.headerSection = document.querySelector('.header');
        this.libraryBtn = document.querySelector('[data-page="library"]');
        this.homeBtn = document.querySelector('[data-page="home"]');
        this.form = document.querySelector('.header-search');
        this.searchForm = document.querySelector('.header-search__form');
        this.searchInput = document.querySelector('.header-search__input');
        this.libButtons = document.querySelector('.headers-button');
        this.watchedBtn = document.querySelector('.header-button__watch');
        this.queueBtn = document.querySelector('.header-button__que');
    }

    showLibrary() {
        this.homeBtn.classList.remove('header-nav--current');
        this.libraryBtn.classList.add('header-nav--current');
        this.headerSection.classList.remove('home');
        this.headerSection.classList.add('library');
        this.form.classList.add('is-hidden');
        this.libButtons.classList.remove('is-hidden');
        this.queueBtn.classList.add('is-active-now');
        this.queueBtn.classList.remove('is-hidden');
        this.watchedBtn.classList.remove('is-hidden');
        this.libButtons.style.display = "flex";
    }

    showHome() {
        this.homeBtn.classList.add('header-nav--current');
        this.libraryBtn.classList.remove('header-nav--current');
        this.headerSection.classList.add('home');
        this.headerSection.classList.remove('library');
        this.form.classList.remove('is-hidden');
        this.queueBtn.classList.add('is-hidden');
        this.watchedBtn.classList.add('is-hidden');
        this.queueBtn.classList.remove('is-active-now');
        this.watchedBtn.classList.remove('is-active-now');
        this.libButtons.style.display = "none";
    }

    showQueue() {
        this.queueBtn.classList.add('is-active-now');
        this.watchedBtn.classList.remove('is-active-now');
    }

    showWatched() {
        this.watchedBtn.classList.add('is-active-now');
        this.queueBtn.classList.remove('is-active-now');
    }
}
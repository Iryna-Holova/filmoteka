//основной скрипт хедера, импортирован в index.js
import Gallery from "./section-gallery";
const gallery = new Gallery();

const refs = {
    headerBgc: document.querySelector('.header'),
    myLibrary : document.querySelector('[data-page="library"]'),
    homePage : document.querySelector('[data-page="home"]'),
    form : document.querySelector('.header-search'),
    libButton: document.querySelector(".headers-button"),
    searchForm: document.querySelector('.header-search__input'),
    gallery: document.querySelector('.film-list'),
    buttonWatch: document.querySelector('.header-button__watch'),
    buttonQueue: document.querySelector('.header-button__que'),
}
refs.myLibrary.addEventListener('click', myLibraryFilm);
refs.homePage.addEventListener('click', homePageFilm);
refs.buttonWatch.addEventListener('click', () => {
    refs.buttonWatch.classList.add('is-active-now');
    refs.buttonQueue.classList.remove('is-active-now');
    gallery.showMylibraryWatch();
});
refs.buttonQueue.addEventListener('click', () =>{
    refs.buttonQueue.classList.add('is-active-now');
    refs.buttonWatch.classList.remove('is-active-now');
    gallery.showMylibraryQueue();
})

function myLibraryFilm(e) {
    e.preventDefault();
    refs.homePage.classList.remove('header-nav--current');
    refs.myLibrary.classList.add('header-nav--current');
    refs.headerBgc.classList.remove('home');
    refs.headerBgc.classList.add('library');
    refs.form.classList.add('is-hidden');
    refs.libButton.classList.remove('is-hidden');
    refs.buttonQueue.classList.add('is-active-now');
    refs.buttonQueue.classList.remove('is-hidden');
    refs.buttonWatch.classList.remove('is-hidden');
    refs.libButton.style.display = "flex";
    gallery.showMylibraryQueue();

}
function homePageFilm(e){
    e.preventDefault();
    refs.homePage.classList.add('header-nav--current');
    refs.myLibrary.classList.remove('header-nav--current');
    refs.headerBgc.classList.add('home');
    refs.headerBgc.classList.remove('library');
    refs.form.classList.remove('is-hidden');
    refs.buttonQueue.classList.add('is-hidden');
    refs.buttonWatch.classList.add('is-hidden');
    refs.buttonQueue.classList.remove('is-active-now');
    refs.buttonWatch.classList.remove('is-active-now');
    refs.libButton.style.display = "none";
    gallery.showHome();
}
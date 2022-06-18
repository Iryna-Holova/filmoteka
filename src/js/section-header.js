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
    refs.buttonQueue.style.backgroundColor = "";
    refs.buttonWatch.style.backgroundColor = "#FF6B01";
    refs.buttonWatch.style.border = "#FF6B01";
    refs.buttonQueue.style.border = "";
    gallery.showMylibraryWatch();
});
refs.buttonQueue.addEventListener('click', () => {
    refs.buttonQueue.style.backgroundColor = "#FF6B01";
    refs.buttonWatch.style.backgroundColor = "";
    refs.buttonWatch.style.border = "";
    gallery.showMylibraryQueue();
})

function myLibraryFilm(e) {
    e.preventDefault();
    refs.homePage.classList.remove('header-nav--current');
    refs.myLibrary.classList.add('header-nav--current');
    refs.headerBgc.classList.remove('home');
    refs.headerBgc.classList.add('library');
    refs.form.style.display = "none";
    refs.libButton.style.display = "flex";
    refs.buttonQueue.style.backgroundColor = "#FF6B01";
    refs.buttonQueue.style.border = "#FF6B01";
    refs.buttonWatch.style.backgroundColor = ""; 
    gallery.showMylibraryWatch();

}
function homePageFilm(e){
    e.preventDefault();
    refs.homePage.classList.add('header-nav--current');
    refs.myLibrary.classList.remove('header-nav--current');
    refs.headerBgc.classList.add('home');
    refs.headerBgc.classList.remove('library');
    refs.form.style.display = "flex";
    refs.libButton.style.display = "none";
    gallery.showHome();
}

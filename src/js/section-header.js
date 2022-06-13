//основной скрипт хедера, импортирован в index.js
const refs = {
    headerBgc: document.querySelector('.header'),
    myLibrary : document.querySelector('[data-page="library"]'),
    homePage : document.querySelector('.header-nav__link'),
    form : document.querySelector('.header-search'),
    libButton: document.querySelector(".headers-button"),
    searchForm: document.querySelector('.header-search__input'),
    gallery: document.querySelector('.film-list'),
}

refs.myLibrary.addEventListener('click',myLibraryFilm)
function myLibraryFilm(e) {
    e.preventDefault();
    refs.homePage.classList.remove('header-nav--current');
    refs.myLibrary.classList.add('header-nav--current');
    refs.headerBgc.classList.remove('home');
    refs.headerBgc.classList.add('library');
    clearMovieList();
    refs.form.style.display = "none";
    refs.libButton.style.display = "flex";

}
function clearMovieList() {
       refs.gallery.innerHTML = '';
    };
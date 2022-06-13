//основной скрипт хедера, импортирован в index.js
<<<<<<< Updated upstream
import clearMovieList from "./fetch_trending_movies"
const myLibrary = document.querySelector('[data-page="library"]');
const homePage = document.querySelector('.header-nav__link');
const inputFilm = document.querySelector('.header-search');
const libButton = document.querySelector(".headers-button");
console.log(myLibrary);
myLibrary.addEventListener('click',myLibraryFilm)
function myLibraryFilm(e) {
    e.preventDefault();
    homePage.classList.remove('header-nav--current');
    myLibrary.classList.add('header-nav--current');
    clearMovieList();
    inputFilm.style.display = "none";
    libButton.style.display = "flex";

}
=======
const refs={
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
    clearMovieList();
    refs.form.style.display = "none";
    refs.libButton.style.display = "flex";

};
function clearMovieList() {
    refs.gallery.innerHTML = '';
};

>>>>>>> Stashed changes

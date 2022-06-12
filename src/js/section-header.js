//основной скрипт хедера, импортирован в index.js
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
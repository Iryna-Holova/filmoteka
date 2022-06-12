// скрипт рендерит список фильмов по ключевому слову, использует запрос с fetch_movies

import FetchMoviesApiService from "./fetch_movies";
import RenderMovies from "./fetch_trending_movies";

const fetchMoviesApiService = new FetchMoviesApiService();
const renderMovies = new RenderMovies();
const refs = {
    gallery: document.querySelector('.film-list'),
    form: document.querySelector('.header-search__form'),
};

refs.form.addEventListener('submit', onSearchMovieByName);

async function onSearchMovieByName(event) {
    event.preventDefault();

    clearMovieList();

    const movieName = event.currentTarget.elements.q.value.trim();
    fetchMoviesApiService.resetPage();

    try {
        const movies = await fetchMoviesApiService.fetchMoviesByName(movieName);
        renderMovies.renderMovieList(movies);
    } catch (error) {
        console.log(error.message);
    };

    refs.form.reset();
};

function clearMovieList() {
    refs.gallery.innerHTML = '';
};
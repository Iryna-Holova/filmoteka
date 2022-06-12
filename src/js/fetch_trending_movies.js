// скрипт рендерит список популярных фильмов, использует запрос с fetch_movies

import FetchMoviesApiService from "./fetch_movies";

const fetchMoviesApiService = new FetchMoviesApiService();
const refs = {
    gallery: document.querySelector('.film-list'),
};

async function onShowTrendingsMovies() {
    clearMovieList();

    fetchMoviesApiService.resetPage();

    try {
        const movies = await fetchMoviesApiService.fetchTrendingMovies();
        const genres = await fetchMoviesApiService.fetchGenres();
        renderMovieList(movies);
    } catch (error) {
        console.log(error.message);
    };
};

function makeMovieCardListMarkup(movies) {
    const movieCardListMarkup = movies.results
        .map(({ title, poster_path, release_date }) => {
            return `<li class="film-list__item">
            <img src="https://image.tmdb.org/t/p/w500${poster_path}" data-src="" alt="Постер фільму" class="lazyload film-list__img" onerror="src='./images/poster-film.png'">
            <h2 class="film-list__title">${title}</h2>
            <p class="film-list__description">Жанр фільму<span>|</span>${release_date.slice(0, 4)}</p>
            </li>`
        }).join('');
    
    return movieCardListMarkup;
};

function renderMovieList(movies) {
    refs.gallery.insertAdjacentHTML('beforeend', makeMovieCardListMarkup(movies));
};

function clearMovieList() {
    refs.gallery.innerHTML = '';
};

onShowTrendingsMovies();
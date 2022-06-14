import { openModal } from './modal';
import RenderMovies from './fetch_trending_movies';
import addSpinner from './loader';
const renderMovies = new RenderMovies;

const gallery = document.querySelector('.film-list');
const searchForm = document.querySelector('.header-search__form');
const modalMovieThumb = document.querySelector('.modal-gallery__flex-thumb');

searchForm.addEventListener('submit', onFormSubmit);
gallery.addEventListener('click', onCardClick);

async function onFormSubmit(event) {
    event.preventDefault();
    addSpinner(gallery);
    const movieName = event.currentTarget.elements.q.value.trim();
    const markup = await renderMovies.searchMoviesByName(movieName);
    gallery.innerHTML = markup;
    searchForm.reset();
}

async function onCardClick(event) {
    if (event.target.nodeName === 'UL') return;
    addSpinner(modalMovieThumb);
    openModal("modal_gallery");
    const id = event.target.closest('.film-list__item').getAttribute('data-id');
    const markup = await renderMovies.searchMovieByID(id);
    modalMovieThumb.innerHTML = markup;
}

async function renderHome() {
    addSpinner(gallery);
    const markup = await renderMovies.showTrendingsMovies(response => {
        return response;
    })
    gallery.innerHTML = markup;
}



async function onSearchMovieByName(movieName) {
    try {
        const movies = await fetchMoviesApiService.fetchMoviesByName(movieName);
        this.fetchAndRenderMovieList(movies);
    } catch (error) {
        console.log(error.message);
    };
};

renderHome()
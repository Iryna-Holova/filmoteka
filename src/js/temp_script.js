import { openModal } from './modal';
import GetMoviesInfo from './get_movies_info';
const getMoviesInfo = new GetMoviesInfo;
import MakeMarcup from './make_markup';
const makeMarkup = new MakeMarcup;

const gallery = document.querySelector('.gallery__home .film-list');
const searchForm = document.querySelector('.header-search__form');
const modalMovieThumb = document.querySelector('.modal-gallery__flex-thumb');

searchForm.addEventListener('submit', onFormSubmit);
gallery.addEventListener('click', onCardClick);

async function onFormSubmit(event) {
    event.preventDefault();
    const movieName = event.currentTarget.elements.q.value.trim();
    renderHomeSearch(movieName);
    searchForm.reset();
}

async function onCardClick(event) {
    if (event.target.nodeName === 'UL') return;
    openModal("modal_gallery");
    const id = event.target.closest('.film-list__item').getAttribute('data-id');
    const movie = await getMoviesInfo.searchMovieByID(id);
    const markup = makeMarkup.makeMovieDetailMarkup(movie);
    modalMovieThumb.innerHTML = markup;
}

async function renderHome() {
    const movies = await getMoviesInfo.searchTrendingsMovies();
    const markup = await makeMarkup.makeMovieCardMarkup(movies);
    gallery.insertAdjacentHTML('beforeend', markup);
}

async function renderHomeSearch(movieName) {
    gallery.innerHTML = '';
    const movies = await getMoviesInfo.searchMoviesByName(movieName);
    const markup = await makeMarkup.makeMovieCardMarkup(movies);
    gallery.insertAdjacentHTML('beforeend', markup)
};

renderHome()
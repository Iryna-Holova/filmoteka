import { openModal } from './modal';
import GetMoviesInfo from './get_movies_info';
const getMoviesInfo = new GetMoviesInfo;
import MakeMarkup from './make_markup';
const makeMarkup = new MakeMarkup;

const gallery = document.querySelector('.gallery__home .film-list');
const searchForm = document.querySelector('.header-search__form');
const modalMovieThumb = document.querySelector('.modal-gallery__flex-thumb');
const navButtons = document.querySelector('.modal-gallery-buttons__nav');

const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.50,
};
const observerHome = new IntersectionObserver(onIntersectHome, options);
const observerSearch = new IntersectionObserver(onIntersectSearch, options);

searchForm.addEventListener('submit', onFormSubmit);
gallery.addEventListener('click', onCardClick);

renderHome();

function onFormSubmit(event) {
    event.preventDefault();
    gallery.innerHTML = '';
    getMoviesInfo.resetPage();

    const movieName = event.currentTarget.elements.q.value.trim();
    getMoviesInfo.query = movieName;
    renderHomeSearch();
    searchForm.reset();
}

function onCardClick(event) {
    if (event.target.nodeName === 'UL') return;
    openModal("modal_gallery");
    const id = event.target.closest('.film-list__item').getAttribute('data-id');
    
    renderMovieDetailMarkup(id);
}

async function renderMovieDetailMarkup(id) {
    const movie = await getMoviesInfo.searchMovieByID(id);
    const markup = makeMarkup.makeMovieDetailMarkup(movie);
    modalMovieThumb.innerHTML = markup;

    const movieCard = document.querySelector(`[data-id="${id}"]`);
    navButtons.firstElementChild.disabled = false;
    navButtons.lastElementChild.disabled = false;
    console.log(navButtons.children);

    if (movieCard.previousSibling.nodeName === 'LI') {
        const prevID = movieCard.previousSibling.getAttribute('data-id');
        navButtons.firstElementChild.setAttribute('data-id', prevID);
    } else navButtons.firstElementChild.disabled = true;

    if (movieCard.nextSibling) {
        const nextID = movieCard.nextSibling.getAttribute('data-id');
        navButtons.lastElementChild.setAttribute('data-id', nextID);
    } else navButtons.lastElementChild.disabled = true;
}

navButtons.firstElementChild.addEventListener('click', onNavButtonClick)
navButtons.lastElementChild.addEventListener('click', onNavButtonClick)

function onNavButtonClick(event) {
    const id = event.currentTarget.getAttribute('data-id')
    renderMovieDetailMarkup(id);
}

async function renderHome() {
    const movies = await getMoviesInfo.searchTrendingsMovies();
    const markup = await makeMarkup.makeMovieCardMarkup(movies);
    gallery.insertAdjacentHTML('beforeend', markup);
    observerHome.observe(gallery.lastElementChild);
}

async function renderHomeSearch() {
    const movies = await getMoviesInfo.searchMoviesByName();
    const markup = await makeMarkup.makeMovieCardMarkup(movies);
    gallery.insertAdjacentHTML('beforeend', markup);
    observerSearch.observe(gallery.lastElementChild);
};

function onIntersectHome(entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            renderHome();
        };
    });
};

function onIntersectSearch(entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            renderHomeSearch();
        };
    });
};
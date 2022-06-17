import { openModal } from './modal';
import GetMoviesInfo from './get_movies_info';
const getMoviesInfo = new GetMoviesInfo;
import MakeMarkup from './make_markup';
const makeMarkup = new MakeMarkup;

const galleryHome = document.querySelector('.gallery__home .film-list');
const gallery = document.querySelector('.gallery')
const searchForm = document.querySelector('.header-search__form');
const modalMovieThumb = document.querySelector('.modal-gallery__flex-thumb');
const navButtons = document.querySelector('.modal-gallery-buttons__nav');
// const 

const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.50,
};
const observerHome = new IntersectionObserver(onIntersectHome, options);
const observerSearch = new IntersectionObserver(onIntersectSearch, options);

searchForm.addEventListener('submit', onFormSubmit);
galleryHome.addEventListener('click', onCardClick);

renderHome();

function onFormSubmit(event) {
    event.preventDefault();
    galleryHome.innerHTML = '';
    getMoviesInfo.resetPage();

    const movieName = event.currentTarget.elements.q.value.trim();
    getMoviesInfo.query = movieName;
    renderHomeSearch();
    searchForm.reset();
}

function onCardClick(event) {
    if (event.target.nodeName === 'UL' || event.target.nodeName === 'BUTTON') return;
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
    galleryHome.insertAdjacentHTML('beforeend', markup);
    observerHome.observe(galleryHome.lastElementChild);
}

async function renderHomeSearch() {
    const movies = await getMoviesInfo.searchMoviesByName();
    const markup = await makeMarkup.makeMovieCardMarkup(movies);
    galleryHome.insertAdjacentHTML('beforeend', markup);
    observerSearch.observe(galleryHome.lastElementChild);
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


gallery.addEventListener('click', onAddButtonClick);
gallery.addEventListener('click', onRemoveButtonClick);

async function onAddButtonClick(event) {
    if (!event.target.hasAttribute('data-add')) return;
    const id = event.target.getAttribute('data-id');
    const array = event.target.getAttribute('data-add');
    const movie = await getMoviesInfo.searchMovieByID(id);
    console.log(`добавь фильм ${id} в массив ${array}`);
    console.log(movie);
    event.target.removeAttribute('data-add');
    event.target.setAttribute('data-remove', array);
}

async function onRemoveButtonClick(event) {
    if (!event.target.hasAttribute('data-remove')) return;
    const id = event.target.getAttribute('data-id');
    const array = event.target.getAttribute('data-remove');
    const movie = await getMoviesInfo.searchMovieByID(id);
    console.log(`удали фильм ${id} из массива ${array}`);
    console.log(movie);
    event.target.removeAttribute('data-remove');
    event.target.setAttribute('data-add', array);
}

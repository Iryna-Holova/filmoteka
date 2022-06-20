import Notiflix from 'notiflix';
import { openModal } from './modal';
import GetMoviesInfo from './get_movies_info';
const getMoviesInfo = new GetMoviesInfo();
import MakeMarkup from './make_markup';
const makeMarkup = new MakeMarkup();
import Gallery from './section-gallery';
const gallery = new Gallery();
import DataBase from './cloud-firestore';
const userDataBase = new DataBase();

const searchForm = document.querySelector('.header-search__form');
const searchInput = document.querySelector('.header-search__input');
const searchBtn = document.querySelector('.header-search__button');
const modalMovieThumb = document.querySelector('.modal-gallery__flex-thumb');
const navButtons = document.querySelector('.modal-gallery-buttons__nav');

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};
const observerHome = new IntersectionObserver(onIntersectHome, options);
const observerSearch = new IntersectionObserver(onIntersectSearch, options);

searchForm.addEventListener('submit', onFormSubmit);
gallery.homeFilmlist.addEventListener('click', onCardClick);
gallery.watchFilmList.addEventListener('click', onCardClick);
gallery.queueFilmList.addEventListener('click', onCardClick);
searchInput.addEventListener('input', onInputChange);

renderHome();

function onFormSubmit(event) {
  event.preventDefault();
  gallery.homeFilmlist.innerHTML = '';
  getMoviesInfo.resetPage();

  const movieName = event.currentTarget.elements.q.value.trim();
  getMoviesInfo.query = movieName;
  renderHomeSearch();
  searchForm.reset();
}

function onCardClick(event) {
  if (event.target.nodeName === 'UL' || event.target.nodeName === 'BUTTON') return;
  openModal('modal_gallery');
  const id = event.target.closest('.film-list__item').getAttribute('data-id');
  const array = event.currentTarget;

  renderMovieDetailMarkup(id, array);
}

async function renderMovieDetailMarkup(id, array) {
  const movie = await getMoviesInfo.searchMovieByID(id);
  const markup = makeMarkup.makeMovieDetailMarkup(movie);
  userDataBase.userIdPromise
    .then(userId => {
      userDataBase
        .isInWatched(userId, id)
        .then(result => {
          if (result) {
            console.log('фильм есть в watched', result);
          } else {
            console.log('фильма нет в watched', result);
          }
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
    });

  userDataBase.userIdPromise
    .then(userId => {
      userDataBase
        .isInQueve(userId, id)
        .then(result => {
          if (result) {
            console.log('фильм есть в queue', result);
          } else {
            console.log('фильма нет в queue', result);
          }
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
    });

  modalMovieThumb.innerHTML = markup;

  const movieCard = document.querySelector(`[data-id="${id}"]`);
  navButtons.firstElementChild.disabled = false;
  navButtons.lastElementChild.disabled = false;

  if (movieCard.previousSibling) {
    const prevID = movieCard.previousSibling.getAttribute('data-id');
    navButtons.firstElementChild.setAttribute('data-id', prevID);
  } else navButtons.firstElementChild.disabled = true;

  if (movieCard.nextSibling) {
    const nextID = movieCard.nextSibling.getAttribute('data-id');
    navButtons.lastElementChild.setAttribute('data-id', nextID);
  } else navButtons.lastElementChild.disabled = true;
}

navButtons.firstElementChild.addEventListener('click', onNavButtonClick);
navButtons.lastElementChild.addEventListener('click', onNavButtonClick);

function onNavButtonClick(event) {
  const id = event.currentTarget.getAttribute('data-id');
  renderMovieDetailMarkup(id);
}

async function renderHome() {
  const movies = await getMoviesInfo.searchTrendingsMovies();
  const markup = await makeMarkup.makeMovieCardMarkup(movies);
  gallery.homeFilmlist.insertAdjacentHTML('beforeend', markup);
  observerHome.observe(gallery.homeFilmlist.lastElementChild);
}

async function renderHomeSearch() {
  const movies = await getMoviesInfo.searchMoviesByName();
  const markup = await makeMarkup.makeMovieCardMarkup(movies);

  if (movies) {
    if (movies.length === 0) {
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      observerSearch.disconnect();
      return;
    }

    gallery.homeFilmlist.insertAdjacentHTML('beforeend', markup);
    observerSearch.observe(gallery.homeFilmlist.lastElementChild);
  }
}

function onIntersectHome(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      renderHome();
    }
  });
}

function onIntersectSearch(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      renderHomeSearch();
    }
  });
}

function onInputChange() {
  if (searchInput.value !== '') {
    searchBtn.disabled = false;
  }

  if (searchInput.value.trim() === '') {
    searchBtn.disabled = true;
  }
}

const body = document.querySelector('body');
body.addEventListener('click', onAddButtonClick);
body.addEventListener('click', onRemoveButtonClick);

async function onAddButtonClick(event) {
  if (!event.target.hasAttribute('data-add')) return;
  const id = event.target.getAttribute('data-id');
  const array = event.target.getAttribute('data-add');
  const movie = await getMoviesInfo.searchMovieByID(id);
  if (array === 'watched') {
    userDataBase.userIdPromise
      .then(userId => {
        userDataBase.addToWatched(userId, movie);
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    userDataBase.userIdPromise
      .then(userId => {
        userDataBase.addToQueue(userId, movie);
      })
      .catch(error => {
        console.log(error);
      });
  }
}

async function onRemoveButtonClick(event) {
  if (!event.target.hasAttribute('data-remove')) return;
  const id = event.target.getAttribute('data-id');
  const movie = await getMoviesInfo.searchMovieByID(id);
  const array = event.target.getAttribute('data-remove');
  if (array === 'watched') {
    userDataBase.userIdPromise
      .then(userId => {
        userDataBase.removeFromWatched(userId, movie);
      })
      .catch(error => {
        console.log(error);
      });
  } else
    userDataBase.userIdPromise
      .then(userId => {
        userDataBase.removeFromQueue(userId, movie);
      })
      .catch(error => {
        console.log(error);
      });
}

function renderWatched() {
  userDataBase.userIdPromise
    .then(userId => {
      userDataBase
        .getWatched(userId)
        .then(async movies => {
          if (movies.length === 0) {
            console.log('пока нет добавленных фильмов watched');
          } else {
            const markup = await makeMarkup.makeWatchedMovieCardMarkup(movies);
            gallery.watchFilmList.innerHTML = markup;
          }
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
    });
}

function renderQueue() {
  userDataBase.userIdPromise
    .then(userId => {
      userDataBase
        .getQueue(userId)
        .then(async movies => {
          if (movies.length === 0) {
            console.log('пока нет добавленных фильмов queue');
          } else {
            const markup = await makeMarkup.makeQueueMovieCardMarkup(movies);
            gallery.queueFilmList.innerHTML = markup;
          }
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
    });
}

renderWatched();
renderQueue();

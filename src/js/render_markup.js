import { spinner } from './spinner';
import GetMoviesInfo from './get_movies_info';
import MakeMarkup from './make_markup';
import Gallery from './section-gallery';
import DataBase from './cloud-firestore';

const getMoviesInfo = new GetMoviesInfo();
const makeMarkup = new MakeMarkup();
const gallery = new Gallery();
const userDataBase = new DataBase();
const modalMovieThumb = document.querySelector('.modal-gallery__flex-thumb');

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};
const observerHome = new IntersectionObserver(onIntersectHome, options);
const observerSearch = new IntersectionObserver(onIntersectSearch, options);

export async function renderHome() {
    spinner.spin(gallery.gallerySection);
    getMoviesInfo.searchTrendingsMovies()
        .then(movies => makeMarkup.makeMovieCardMarkup(movies))
        .then(markup => {
            gallery.homeFilmlist.insertAdjacentHTML('beforeend', markup);
            observerHome.observe(gallery.homeFilmlist.lastElementChild);
            spinner.stop(gallery.gallerySection);
        })
        .catch(() => {
            gallery.showErrorHome();
            spinner.stop(gallery.gallerySection);
        });
}

export function setNewSearch(searchQuery) {
    getMoviesInfo.resetPage();
    getMoviesInfo.query = searchQuery;
}

export async function renderHomeSearch() {
    spinner.spin(gallery.gallerySection);
    getMoviesInfo.searchMoviesByName()
        .then(movies => makeMarkup.makeMovieCardMarkup(movies))
        .then(markup => {
            gallery.homeFilmlist.insertAdjacentHTML('beforeend', markup);
            observerSearch.observe(gallery.homeFilmlist.lastElementChild);
            spinner.stop(gallery.gallerySection);
        })
        .catch(() => {
            gallery.showErrorHome();
            observerSearch.disconnect();
            spinner.stop(gallery.gallerySection);
        });
}

export function renderQueue() {
    gallery.queueFilmList.innerHTML = '';
    spinner.spin(gallery.gallerySection);
    userDataBase.userIdPromise
        .then(userId => {
            userDataBase
                .getQueue(userId)
                .then(async movies => {
                    if (movies.length === 0) {
                        gallery.showErrorlibraryQueue();
                        spinner.stop(gallery.gallerySection);
                    } else {
                        const markup = await makeMarkup.makeQueueMovieCardMarkup(movies);
                        gallery.queueFilmList.innerHTML = markup;
                        spinner.stop(gallery.gallerySection);
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

export function renderWatched() {
    gallery.watchFilmList.innerHTML = '';
    spinner.spin(gallery.gallerySection);
    userDataBase.userIdPromise
        .then(userId => {
            userDataBase
                .getWatched(userId)
                .then(async movies => {
                    if (movies.length === 0) {
                        gallery.showErrorlibraryWatch();
                        spinner.stop(gallery.gallerySection);
                    } else {
                        const markup = await makeMarkup.makeWatchedMovieCardMarkup(movies);
                        gallery.watchFilmList.innerHTML = markup;
                        spinner.stop(gallery.gallerySection);
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

export async function renderMovieDetailMarkup(id) {
  const movie = await getMoviesInfo.searchMovieByID(id);
  const markup = makeMarkup.makeMovieDetailMarkup(movie);
  modalMovieThumb.innerHTML = markup;
  const modalButtons = document.querySelector('.modal-gallery-buttons__thumb');

  userDataBase.userIdPromise
    .then(userId => {
      userDataBase
        .isInWatched(userId, id)
        .then(result => {
          if (!result) {
            return;
          } else {
            modalButtons.firstElementChild.removeAttribute('data-add');
            modalButtons.firstElementChild.setAttribute('data-remove', 'watched');
            modalButtons.firstElementChild.classList.add('remove-btn');
            modalButtons.firstElementChild.textContent = 'Remove from Watched';
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
          if (!result) {
            return;
          } else {
            modalButtons.lastElementChild.removeAttribute('data-add');
            modalButtons.lastElementChild.setAttribute('data-remove', 'queue');
            modalButtons.lastElementChild.classList.add('remove-btn');
            modalButtons.lastElementChild.textContent = 'Remove from Queue';
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
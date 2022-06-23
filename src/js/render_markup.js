import { spinner } from './spinner';
import GetMoviesInfo from './get_movies_info';
import MakeMarkup from './make_markup';
import Gallery from './section-gallery';
import DataBase from './cloud-firestore';

const getMoviesInfo = new GetMoviesInfo();
const makeMarkup = new MakeMarkup();
const gallery = new Gallery();
const userDataBase = new DataBase();
const loginBtn = document.querySelector('[data-page="log-in"]')
const modalMovieThumb = document.querySelector('.modal-gallery__flex-thumb');

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};
const observerHome = new IntersectionObserver(onIntersectHome, options);
const observerSearch = new IntersectionObserver(onIntersectSearch, options);

export function setNewSearch(searchQuery) {
    getMoviesInfo.resetPage();
    getMoviesInfo.query = searchQuery;
}

export async function renderHome() {
  spinner.spin(gallery.gallerySection);
  
  try {
    const movies = await getMoviesInfo.searchTrendingsMovies();
    const markup = await makeMarkup.makeMovieCardMarkup(movies);
    gallery.homeFilmlist.insertAdjacentHTML('beforeend', markup);
    if (loginBtn.classList.contains('is-hidden')) {
      checkInWatched(movies);
      checkInQueue(movies);
    }
    observerHome.observe(gallery.homeFilmlist.lastElementChild);
    spinner.stop(gallery.gallerySection);
  } catch {
    gallery.showErrorHome();
    spinner.stop(gallery.gallerySection);
  };
}

export async function renderHomeSearch() {
  spinner.spin(gallery.gallerySection);

  try {
    const movies = await getMoviesInfo.searchMoviesByName();
    const markup = await makeMarkup.makeMovieCardMarkup(movies);
    gallery.homeFilmlist.insertAdjacentHTML('beforeend', markup);
    if (loginBtn.classList.contains('is-hidden')) {
      checkInWatched(movies);
      checkInQueue(movies);
    }
    observerSearch.observe(gallery.homeFilmlist.lastElementChild);
    spinner.stop(gallery.gallerySection);
  } catch {
    gallery.showErrorHome();
    observerSearch.disconnect();
    spinner.stop(gallery.gallerySection);
  };
}

export function renderQueue() {
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
            checkInWatched(movies);
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
            checkInQueue(movies);
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

function checkInWatched(movies) {
  movies.forEach(movie => {
    const id = movie.id;

    userDataBase.userIdPromise
      .then(userId => {
        userDataBase
          .isInWatched(userId, id)
          .then(result => {
            if (!result) {
              return;
            } else {
              const buttonAddWatched = document.querySelector(`[data-id='${id}'].watch`)
              buttonAddWatched.removeAttribute('data-add');
              buttonAddWatched.setAttribute('data-remove', 'watched');
              buttonAddWatched.classList.add('remove-btn');
            }
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  })
}

function checkInQueue(movies) {
  movies.forEach(movie => {
    const id = movie.id;
    
    userDataBase.userIdPromise
      .then(userId => {
        userDataBase
          .isInQueve(userId, id)
          .then(result => {
            if (!result) {
              return;
            } else {
              const buttonAddQueue = document.querySelector(`[data-id='${id}'].queue`)
              buttonAddQueue.removeAttribute('data-add');
              buttonAddQueue.setAttribute('data-remove', 'queue');
              buttonAddQueue.classList.add('remove-btn');
            }
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      }); 
  })
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
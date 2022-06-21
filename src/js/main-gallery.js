import Notiflix from 'notiflix';
import DataBase from './cloud-firestore';
import GetMoviesInfo from './get_movies_info';
import { renderMovieDetailMarkup } from './render_markup';
import Gallery from './section-gallery';
import { openModal } from './modal';
import MicroModal from 'micromodal';
const userDataBase = new DataBase();
const getMoviesInfo = new GetMoviesInfo();
const gallery = new Gallery();
const navButtons = document.querySelector('.modal-gallery-buttons__nav');

const body = document.querySelector('body');
body.addEventListener('click', onAddButtonClick);
body.addEventListener('click', onRemoveButtonClick);
gallery.homeFilmlist.addEventListener('click', onCardClick);
gallery.watchFilmList.addEventListener('click', onCardClick);
gallery.queueFilmList.addEventListener('click', onCardClick);
navButtons.firstElementChild.addEventListener('click', onNavButtonClick);
navButtons.lastElementChild.addEventListener('click', onNavButtonClick);

async function onAddButtonClick(event) {
    if (!event.target.hasAttribute('data-add')) return;
    const id = event.target.getAttribute('data-id');
    const array = event.target.getAttribute('data-add');
    const movie = await getMoviesInfo.searchMovieByID(id);
    if (array === 'watched') {
        userDataBase.userIdPromise
            .then(userId => {
                userDataBase
                    .isInWatched(userId, id)
                    .then(result => {
                        if (result) {
                            Notiflix.Notify.info('This movie has already been added to your library Watched');
                        } else {
                            userDataBase
                                .addToWatched(userId, movie)
                            Notiflix.Notify.success('The movie has been successfully added to your library Watched')
                            if (event.target.textContent) {
                                event.target.removeAttribute('data-add');
                                event.target.setAttribute('data-remove', 'watched');
                                event.target.classList.add('remove-btn');
                                event.target.textContent = 'Remove from Watched';
                            }
                        }
                    })
            })
            .catch(error => {
                console.log(error);
            });
    } else {
        userDataBase.userIdPromise
            .then(userId => {
                userDataBase
                    .isInQueve(userId, id)
                    .then(result => {
                        if (result) {
                            Notiflix.Notify.info('This movie has already been added to your library Queue');
                        } else {
                            userDataBase
                                .addToQueue(userId, movie);
                            Notiflix.Notify.success('The movie has been successfully added to your library Queue');
                            if (event.target.textContent) {
                                event.target.removeAttribute('data-add');
                                event.target.setAttribute('data-remove', 'queue');
                                event.target.classList.add('remove-btn');
                                event.target.textContent = 'Remove from Queue';
                            }
                        }
                    })
            })
            .catch(error => {
                console.log(error);
            });
    }
}

async function onRemoveButtonClick(event) {
    if (!event.target.hasAttribute('data-remove')) return;
    const id = event.target.getAttribute('data-id');
    const array = event.target.getAttribute('data-remove');
    if (array === 'watched') {
        userDataBase.userIdPromise
            .then(userId => {
                userDataBase.removeFromWatched(userId, id);
                Notiflix.Notify.success('The movie was successfully deleted from your library Watched');
                if ((event.target.textContent) && (gallery.watchFilmList.querySelector(`[data-id="${id}"]`))) {
                    gallery.watchFilmList.querySelector(`[data-id="${id}"]`).style.display = "none";
                    MicroModal.close('modal_gallery');
                } else if (gallery.watchFilmList.querySelector(`[data-id="${id}"]`)) {
                    gallery.watchFilmList.querySelector(`[data-id="${id}"]`).style.display = "none";
                } else if (event.target.textContent) {
                    event.target.removeAttribute('data-remove');
                    event.target.setAttribute('data-add', 'watched');
                    event.target.classList.remove('remove-btn');
                    event.target.textContent = 'Add to watched';
                }
            })
            .catch(error => {
                console.log(error);
            });
    } else {
        userDataBase.userIdPromise
            .then(userId => {
                userDataBase.removeFromQueue(userId, id);
                Notiflix.Notify.success('The movie was successfully deleted from your library Queue');
                if ((event.target.textContent) && (gallery.queueFilmList.querySelector(`[data-id="${id}"]`))) {
                    gallery.queueFilmList.querySelector(`[data-id="${id}"]`).style.display = "none";
                    MicroModal.close('modal_gallery');
                } else if (gallery.queueFilmList.querySelector(`[data-id="${id}"]`)) {
                    gallery.queueFilmList.querySelector(`[data-id="${id}"]`).style.display = "none";
                } else if (event.target.textContent) {
                    event.target.removeAttribute('data-remove');
                    event.target.setAttribute('data-add', 'queue');
                    event.target.classList.remove('remove-btn');
                    event.target.textContent = 'Add to queue';
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
}

function onCardClick(event) {
    if (event.target.nodeName === 'UL' || event.target.nodeName === 'BUTTON') return;
    const id = event.target.closest('.film-list__item').getAttribute('data-id');
    const array = event.currentTarget.getAttribute('data-array');
    openModal('modal_gallery');
    renderMovieDetailMarkup(id);
    setNavButtons(id, array);
    navButtons.firstElementChild.setAttribute('data-array', array);
    navButtons.lastElementChild.setAttribute('data-array', array);
}

function onNavButtonClick(event) {
    const id = event.currentTarget.getAttribute('data-id');
    const array = event.currentTarget.getAttribute('data-array');
    renderMovieDetailMarkup(id);
    setNavButtons(id, array);
}

function setNavButtons(id, array) {
    let movieCard='';
    if (array === 'home') {
        movieCard = gallery.homeFilmlist.querySelector(`[data-id="${id}"]`);
    } else if (array === 'watched') {
        movieCard = gallery.watchFilmList.querySelector(`[data-id="${id}"]`);
    } else if (array === 'queue') {
        movieCard = gallery.queueFilmList.querySelector(`[data-id="${id}"]`);
    }
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

// скрипт рендерит список популярных фильмов, использует запрос с fetch_movies

import FetchMoviesApiService from "./fetch_movies";

const fetchMoviesApiService = new FetchMoviesApiService();
const refs = {
    gallery: document.querySelector('.film-list'),
    form: document.querySelector('.header-search__form'),
    modalMovieThumb: document.querySelector('.modal-gallery__flex-thumb'),
};

export default class RenderMovies {
    constructor() { };

    async fetchAndRenderMovieList(movies) {
        this.clearMovieList();
        fetchMoviesApiService.resetPage();
        const genres = await fetchMoviesApiService.fetchGenres();
        this.getGenres(movies, genres);
        refs.gallery.insertAdjacentHTML('beforeend', this.makeMovieCardMarkup(movies));
    };

    async onShowTrendingsMovies() {
    try {
        const movies = await fetchMoviesApiService.fetchTrendingMovies();
        this.fetchAndRenderMovieList(movies);
    } catch (error) {
        console.log(error.message);
    };
    };

    async onSearchMovieByName(event) { 
        event.preventDefault();
        const movieName = event.currentTarget.elements.q.value.trim();
    try {
        const movies = await fetchMoviesApiService.fetchMoviesByName(movieName);
        this.fetchAndRenderMovieList(movies);
    } catch (error) {
        console.log(error.message);
    };

    refs.form.reset();
    };

    getGenres(movies, genres) {
     movies.results.forEach(element => {
         const id = element.genre_ids;
         for (const genre of genres) {
             if (id.includes(genre.id)) {
                 id.push(genre.name);
             };
         };
         for (let i = 0; i < id.length; i++) {
            const el = Number(id[i]);
             if (!(Number.isNaN(el))) {
                 id.splice(i, 1);
                 i--;
             };
         };
     });   
    };

    makeMovieCardMarkup(movies) {
        let genres = [];
        let releaseDate = "No date";
        const movieCardMarkup = movies.results
            .map(({ title, poster_path, release_date, genre_ids, id }) => {
                if (genre_ids.length === 0) {
                genres = genre_ids.slice(0, 1);
                genres.splice(0, 0, "No genre");
            } else if (genre_ids.length > 2) {
                genres = genre_ids.slice(0, 2);
                genres.splice(2, 0, "Other");
            } else {
                genres = genre_ids;
            };
            if (release_date !== '') {
                releaseDate = release_date.slice(0, 4);
            };
                return `<li class="film-list__item" data-id="${id}">
            <img src="https://image.tmdb.org/t/p/w500${poster_path}" data-src="" alt="Постер фільму" class="lazyload film-list__img" onerror="this.onerror=null;this.src='https://bflix.biz/no-poster.png'">
            <h2 class="film-list__title">${title}</h2>
            <p class="film-list__description">${genres}<span>|</span>${releaseDate}</p>
            </li>`   
        }).join('');
    
    return movieCardMarkup;
    };

    makeLibraryMovieCardMarkup(movies) {
        let genres = [];
        let releaseDate = "No date";
        const libraryMovieCardMarkup = movies.results
            .map(({ title, poster_path, release_date, genre_ids, vote_average }) => {
                if (genre_ids.length === 0) {
                    genres = genre_ids.slice(0, 1);
                    genres.splice(0, 0, "No genre");
                } else if (genre_ids.length > 2) {
                    genres = genre_ids.slice(0, 2);
                    genres.splice(2, 0, "Other");
                } else {
                    genres = genre_ids;
                };
                if (release_date !== '') {
                    releaseDate = release_date.slice(0, 4);
                };
                return `<li class="film-list__item">
                   <img src="https://image.tmdb.org/t/p/w500${poster_path}" data-src="" alt="Постер фільму" class="lazyload film-list__img" onerror="this.onerror=null;this.src='https://bflix.biz/no-poster.png'">
                   <h2 class="film-list__title">${title}</h2>
                   <p class="film-list__description">${genres}<span>|</span>${releaseDate}</p>
                   <p class="film-list__rating">${vote_average}</p>
                   </li>`
            }).join('');
    
    return libraryMovieCardMarkup;
    };

    makeMovieDetailMarkup(movies) {
        const movieDetailMarkup = movies.results
            .map(({ poster_path, title, vote_average, vote_count, popularity, original_title, genres, overview }) => {
                return `<div class="modal-gallery__thumb">
            <img src="${poster_path}" alt="poster" onerror="this.onerror=null;this.src='https://bflix.biz/no-poster.png'" />
          </div>
          <div class="modal-gallery__thumb">
            <h2 class="modal-gallery__title">${title}</h2>
            <ul class="modal-gallery-list">
              <li class="modal-gallery-list__item">
                Vote / Votes <span class="modal-gallery-list__vote">${vote_average}</span> /
                <span class="modal-gallery-list__votes">${vote_count}</span>
              </li>
              <li class="modal-gallery-list__item">
                Popularity
                <span class="modal-gallery-list__popularity">${popularity}</span>
              </li>
              <li class="modal-gallery-list__item">
                Original Title
                <span class="modal-gallery-list__title">${original_title}</span>
              </li>
              <li class="modal-gallery-list__item">
                Genre
                <span class="modal-gallery-list__genre">${genres.map(genre => genre.name)}</span>
              </li>
            </ul>
            <article class="modal-gallery-about">
              <h3 class="modal-gallery-about__title">About</h3>
              <p class="modal-gallery-about__text">${overview}</p>
            </article>
            <div class="modal-gallery-buttons__thumb">
              <button class="button modal-gallery-button">Add to watched</button>
              <button class="button modal-gallery-button modal-button__queue">Add to queue</button>
            </div>
          </div>`   
        }).join('');
    
    return movieDetailMarkup;
    };

    clearMovieList() {
       refs.gallery.innerHTML = '';
    };
};

const renderMovies = new RenderMovies();

renderMovies.onShowTrendingsMovies();

refs.form.addEventListener('submit', renderMovies.onSearchMovieByName.bind(renderMovies));
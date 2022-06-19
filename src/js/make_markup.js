export default class MakeMarkup {

    makeMovieCardMarkup(movies) {
        let genres = [];
        let releaseDate = "No date";
        if (movies) {
            const movieCardMarkup = movies
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
            if (release_date && release_date !== '') {
                releaseDate = release_date.slice(0, 4);
            };
                if (poster_path) {
                    return `<li class="film-list__item" data-id="${id}">
                    <div class="film-list__poster">
                        <img src="https://image.tmdb.org/t/p/w500${poster_path}" loading=lazy alt="${title} poster" class="film-list__img" onerror="this.onerror=null;this.src='https://bflix.biz/no-poster.png'">
                        <div class="film-list__icons">
                            <button class="gallery-button watch" data-add='watched' data-id="${id}"></button>
                            <button class="gallery-button queue" data-add='queque' data-id="${id}"></button>
                        </div>
                    </div>
                    <div class="film-list__description">
                        <h2 class="film-list__title">${title}</h2>
                        <p class="film-list__genres">${Object.values(genres).join(', ')}<span> | </span>${releaseDate}</p>
                    </div>
                </li>`
                } else {
                    return `<li class="film-list__item" data-id="${id}">
                    <img src="https://bflix.biz/no-poster.png" loading=lazy alt="${title} poster" class="film-list__img" onerror="this.onerror=null;this.src='https://bflix.biz/no-poster.png'">
                    <div class="film-list__description">
                        <h2 class="film-list__title">${title}</h2>
                        <p class="film-list__genres">${Object.values(genres).join(', ')}<span> | </span>${releaseDate}</p>
                    </div>
                    <button class="gallery-button" data-add='watched' data-id="${id}">&#128065;&#65039;</button>
                    <button class="gallery-button" data-add='queque' data-id="${id}">&#9825;</button>
                </li>`
                }
            }).join('');
    
        return movieCardMarkup;
        }
    };

    makeWatchedMovieCardMarkup(movies) {
        let releaseDate = "No date";
        let movieGenres = [];
        let moviGenresNames = [];
        if (movies) {
            const libraryMovieCardMarkup = movies
            .map(({ title, poster_path, release_date, genres, vote_average, id }) => {
                if (release_date && release_date !== '') {
                    releaseDate = release_date.slice(0, 4);
                };
                if (genres.length === 0) {
                    movieGenres = genres.slice(0, 1);
                    movieGenres.splice(0, 0);
                    moviGenresNames = [...movieGenres, { id: '', name: 'No genre' }];
                    moviGenresNames = moviGenresNames.map(genre => genre.name);
                } else if (genres.length > 2) {
                    movieGenres = genres.slice(0, 2);
                    moviGenresNames = [...movieGenres, { id: '', name: 'Other' }];
                    moviGenresNames = moviGenresNames.map(genre => genre.name);
                } else {
                    movieGenres = genres;
                    moviGenresNames = [...movieGenres];
                    moviGenresNames = moviGenresNames.map(genre => genre.name);
                };
                if (poster_path) {
                    return `<li class="film-list__item" data-id="${id}">
                        <div class="film-list__poster">
                            <img src="https://image.tmdb.org/t/p/w500${poster_path}" loading=lazy alt="${title} poster" class="film-list__img" onerror="this.onerror=null;this.src='https://bflix.biz/no-poster.png'">
                            <div class="film-list__icons">
                                <button class="gallery-button queue" data-add='queque' data-id="${id}"></button>
                                <button class="gallery-button remove" data-remove='watched' data-id="${id}">x</button>
                            </div>
                        </div>
                        <div class="film-list__description">
                            <h2 class="film-list__title">${title}</h2>
                                <p class="film-list__genres">${moviGenresNames.join(', ')}<span> | </span>${releaseDate}</p>
                                <p class="film-list__rating">${vote_average}</p>
                            </div>
                        </li>`
                } else {
                    return `<li class="film-list__item">
                        <img src="https://bflix.biz/no-poster.png" loading=lazy alt="${title} poster" class="film-list__img" onerror="this.onerror=null;this.src='https://bflix.biz/no-poster.png'">
                        <div class="film-list__description">
                            <h2 class="film-list__title">${title}</h2>
                                <p class="film-list__genres">${moviGenresNames.join(' ')}<span> | </span>${releaseDate}</p>
                                <p class="film-list__rating">${vote_average}</p>
                            </div>
                        </li>`
                }
            }).join('');
    
    return libraryMovieCardMarkup;
        }
    };

    makeQueueMovieCardMarkup(movies) {
        let releaseDate = "No date";
        let movieGenres = [];
        let moviGenresNames = [];
        if (movies) {
            const libraryMovieCardMarkup = movies
            .map(({ title, poster_path, release_date, genres, vote_average, id }) => {
                if (release_date && release_date !== '') {
                    releaseDate = release_date.slice(0, 4);
                };
                if (genres.length === 0) {
                    movieGenres = genres.slice(0, 1);
                    movieGenres.splice(0, 0);
                    moviGenresNames = [...movieGenres, { id: '', name: 'No genre' }];
                    moviGenresNames = moviGenresNames.map(genre => genre.name);
                } else if (genres.length > 2) {
                    movieGenres = genres.slice(0, 2);
                    moviGenresNames = [...movieGenres, { id: '', name: 'Other' }];
                    moviGenresNames = moviGenresNames.map(genre => genre.name);
                } else {
                    movieGenres = genres;
                    moviGenresNames = [...movieGenres];
                    moviGenresNames = moviGenresNames.map(genre => genre.name);
                };
                if (poster_path) {
                    return `<li class="film-list__item" data-id="${id}">
                        <div class="film-list__poster">
                            <img src="https://image.tmdb.org/t/p/w500${poster_path}" loading=lazy alt="${title} poster" class="film-list__img" onerror="this.onerror=null;this.src='https://bflix.biz/no-poster.png'">
                            <div class="film-list__icons">
                                <button class="gallery-button watch" data-add='watched' data-id="${id}"></button>
                                <button class="gallery-button remove" data-remove='queue' data-id="${id}">x</button>
                            </div>
                        </div>
                        <div class="film-list__description">
                            <h2 class="film-list__title">${title}</h2>
                                <p class="film-list__genres">${moviGenresNames.join(', ')}<span> | </span>${releaseDate}</p>
                                <p class="film-list__rating">${vote_average}</p>
                            </div>
                        </li>`
                } else {
                    return `<li class="film-list__item">
                        <img src="https://bflix.biz/no-poster.png" loading=lazy alt="${title} poster" class="film-list__img" onerror="this.onerror=null;this.src='https://bflix.biz/no-poster.png'">
                        <div class="film-list__description">
                            <h2 class="film-list__title">${title}</h2>
                                <p class="film-list__genres">${moviGenresNames.join(' ')}<span> | </span>${releaseDate}</p>
                                <p class="film-list__rating">${vote_average}</p>
                            </div>
                        </li>`
                }
            }).join('');
    
    return libraryMovieCardMarkup;
        }
    };    

    makeMovieDetailMarkup({poster_path, title, vote_average, vote_count, popularity, original_title, genres, overview, id}) {
        let movieDetailMarkup;
        if (poster_path) {
            movieDetailMarkup = `
        <div class="modal-gallery__thumb">
            <img src="https://image.tmdb.org/t/p/original${poster_path}" alt="${title} poster" onerror="this.onerror=null;this.src='https://bflix.biz/no-poster.png'" />
        </div>
        <div class="modal-gallery__thumb-text">
            <h2 class="modal-gallery__title">${title}</h2>
            <ul class="modal-gallery-list">
                <li class="modal-gallery-list__item">
                    Vote / Votes <span class="modal-gallery-list__vote">${vote_average}</span> /
                    <span class="modal-gallery-list__votes">${vote_count}</span>
                </li>
                <li class="modal-gallery-list__item">
                    Popularity<span class="modal-gallery-list__popularity">${popularity}</span>
                </li>
                <li class="modal-gallery-list__item">
                    Original Title<span class="modal-gallery-list__title">${original_title}</span>
                </li>
                <li class="modal-gallery-list__item">
                    Genre<span class="modal-gallery-list__genre">${genres.map(genre => genre.name).join(', ')}</span>
                </li>
            </ul>
            <article class="modal-gallery-about">
                <h3 class="modal-gallery-about__title">About</h3>
                <p class="modal-gallery-about__text">${overview}</p>
            </article>
            <div class="modal-gallery-buttons__thumb">
                <button class="button modal-gallery-button" data-add=watched data-id="${id}">Add to watched</button>
                <button class="button modal-gallery-button modal-button__queue" data-add=queque data-id="${id}">Add to queue</button>
            </div>
        </div>`
        } else {
            movieDetailMarkup = `
        <div class="modal-gallery__thumb">
            <img src="https://bflix.biz/no-poster.png" alt="${title} poster" onerror="this.onerror=null;this.src='https://bflix.biz/no-poster.png'" />
        </div>
        <div class="modal-gallery__thumb-text">
            <h2 class="modal-gallery__title">${title}</h2>
            <ul class="modal-gallery-list">
                <li class="modal-gallery-list__item">
                    Vote / Votes <span class="modal-gallery-list__vote">${vote_average}</span> /
                    <span class="modal-gallery-list__votes">${vote_count}</span>
                </li>
                <li class="modal-gallery-list__item">
                    Popularity<span class="modal-gallery-list__popularity">${popularity}</span>
                </li>
                <li class="modal-gallery-list__item">
                    Original Title<span class="modal-gallery-list__title">${original_title}</span>
                </li>
                <li class="modal-gallery-list__item">
                    Genre<span class="modal-gallery-list__genre">${genres.map(genre => genre.name).join(', ')}</span>
                </li>
            </ul>
            <article class="modal-gallery-about">
                <h3 class="modal-gallery-about__title">About</h3>
                <p class="modal-gallery-about__text">${overview}</p>
            </article>
            <div class="modal-gallery-buttons__thumb">
                <button class="button modal-gallery-button" data-add=watched data-id="${id}">Add to watched</button>
                <button class="button modal-gallery-button modal-button__queue" data-add=queque data-id="${id}">Add to queue</button>
            </div>
        </div>`
        }
    
        return movieDetailMarkup;
    };

    makeMarkupForLibraryMovieCard({ title, poster_path, release_date, genres, vote_average }) {
    let releaseDate = "No date";
        let movieGenres = [];
        let moviGenresNames = [];
        let markupForLibraryMovieCard;
        if ({ title, poster_path, release_date, genres, vote_average }) {
                if (release_date && release_date !== '') {
                    releaseDate = release_date.slice(0, 4);
                };
                if (genres.length === 0) {
                    movieGenres = genres.slice(0, 1);
                    movieGenres.splice(0, 0);
                    moviGenresNames = [...movieGenres, { id: '', name: 'No genre' }];
                    moviGenresNames = moviGenresNames.map(genre => genre.name);
                } else if (genres.length > 2) {
                    movieGenres = genres.slice(0, 2);
                    moviGenresNames = [...movieGenres, { id: '', name: 'Other' }];
                    moviGenresNames = moviGenresNames.map(genre => genre.name);
                } else {
                    movieGenres = genres;
                    moviGenresNames = [...movieGenres];
                    moviGenresNames = moviGenresNames.map(genre => genre.name);
                };
                if (poster_path) {
                    markupForLibraryMovieCard = `<li class="film-list__item">
                        <img src="https://image.tmdb.org/t/p/w500${poster_path}" loading=lazy alt="${title} poster" class="film-list__img" onerror="this.onerror=null;this.src='https://bflix.biz/no-poster.png'">
                        <div class="film-list__description">
                            <h2 class="film-list__title">${title}</h2>
                                <p class="film-list__genres">${moviGenresNames.join(', ')}<span> | </span>${releaseDate}</p>
                                <p class="film-list__rating">${vote_average}</p>
                            </div>
                        </li>`
                } else {
                    markupForLibraryMovieCard = `<li class="film-list__item">
                        <img src="https://bflix.biz/no-poster.png" loading=lazy alt="${title} poster" class="film-list__img" onerror="this.onerror=null;this.src='https://bflix.biz/no-poster.png'">
                        <div class="film-list__description">
                            <h2 class="film-list__title">${title}</h2>
                                <p class="film-list__genres">${moviGenresNames.join(' ')}<span> | </span>${releaseDate}</p>
                                <p class="film-list__rating">${vote_average}</p>
                            </div>
                        </li>`
                };
   
        return libraryCardMarkup;
        };
    };
};
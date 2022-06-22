export default class MakeMarkup {
  makeMovieCardMarkup(movies) {
    let genres = [];
    let releaseDate = 'No date';
    if (movies) {
      const movieCardMarkup = movies
        .map(({ title, poster_path, release_date, genre_ids, id }) => {
          if (genre_ids.length === 0) {
            genres = genre_ids.slice(0, 1);
            genres.splice(0, 0, 'No genre');
          } else if (genre_ids.length > 2) {
            genres = genre_ids.slice(0, 2);
            genres.splice(2, 0, 'Other');
          } else {
            genres = genre_ids;
          }
          if (release_date && release_date !== '') {
            releaseDate = release_date.slice(0, 4);
          }
          if (poster_path) {
            return `<li class="film-list__item" data-id="${id}">
                    <div class="film-list__poster">
                        <img src="https://image.tmdb.org/t/p/w500${poster_path}" loading=lazy alt="${title} poster" class="film-list__img" onerror="this.onerror=null;this.src='https://bflix.biz/no-poster.png'">
                        <div class="film-list__icons">
                            <button class="gallery-button watch" data-add='watched' aria-label='add movie watched' data-id="${id}"></button>
                            <button class="gallery-button queue" data-add='queue' aria-label='add movie queue' data-id="${id}"></button>
                        </div>
                    </div>
                    <div class="film-list__description">
                        <h2 class="film-list__title">${title}</h2>
                        <p class="film-list__genres">${Object.values(genres).join(
                          ', ',
                        )}<span> | </span>${releaseDate}</p>
                    </div>
                </li>`;
          } else {
            return `<li class="film-list__item" data-id="${id}">
                    <div class="film-list__poster">
                        <img src="https://bflix.biz/no-poster.png" loading=lazy alt="${title} poster" class="film-list__img" onerror="this.onerror=null;this.src='https://bflix.biz/no-poster.png'">
                        <div class="film-list__icons">
                            <button class="gallery-button watch" data-add='watched' aria-label='add movie watched' data-id="${id}"></button>
                            <button class="gallery-button queue" data-add='queue' aria-label='add movie queue' data-id="${id}"></button>
                        </div>
                    </div>
                    <div class="film-list__description">
                        <h2 class="film-list__title">${title}</h2>
                        <p class="film-list__genres">${Object.values(genres).join(
                          ', ',
                        )}<span> | </span>${releaseDate}</p>
                    </div>
                </li>`;
          }
        })
        .join('');

      return movieCardMarkup;
    }
  }

  makeWatchedMovieCardMarkup(movies) {
    let releaseDate = 'No date';
    let movieGenres = [];
    let moviGenresNames = [];
    if (movies) {
      const libraryMovieCardMarkup = movies
        .reverse()
        .map(({ title, poster_path, release_date, genres, vote_average, id }) => {
          if (release_date && release_date !== '') {
            releaseDate = release_date.slice(0, 4);
          }
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
          }
          if (poster_path) {
            return `<li class="film-list__item" data-id="${id}">
                        <div class="film-list__poster">
                            <img src="https://image.tmdb.org/t/p/w500${poster_path}" loading=lazy alt="${title} poster" class="film-list__img" onerror="this.onerror=null;this.src='https://bflix.biz/no-poster.png'">
                            <div class="film-list__icons">
                                <button class="gallery-button queue" data-add='queue' aria-label='add movie queue' data-id="${id}"></button>
                                <button class="gallery-button remove" data-remove='watched' aria-label='remove movie watched' data-id="${id}"></button>
                            </div>
                        </div>
                        <div class="film-list__description">
                            <h2 class="film-list__title">${title}</h2>
                                <p class="film-list__genres">${moviGenresNames.join(
                                  ', ',
                                )}<span> | </span>${releaseDate}</p>
                                <p class="film-list__rating">${vote_average.toFixed(1)}</p>
                            </div>
                        </li>`;
          } else {
            return `<li class="film-list__item" data-id="${id}">
                        <div class="film-list__poster">
                            <img src="https://bflix.biz/no-poster.png" loading=lazy alt="${title} poster" class="film-list__img" onerror="this.onerror=null;this.src='https://bflix.biz/no-poster.png'">
                            <div class="film-list__icons">
                                <button class="gallery-button queue" data-add='queue' aria-label='add movie queue' data-id="${id}"></button>
                                <button class="gallery-button remove" data-remove='watched' aria-label='remove movie watched' data-id="${id}"></button>
                            </div>
                        </div>
                        <div class="film-list__description">
                            <h2 class="film-list__title">${title}</h2>
                                <p class="film-list__genres">${moviGenresNames.join(
                                  ' ',
                                )}<span> | </span>${releaseDate}</p>
                                <p class="film-list__rating">${vote_average.toFixed(1)}</p>
                            </div>
                        </li>`;
          }
        })
        .join('');

      return libraryMovieCardMarkup;
    }
  }

  makeQueueMovieCardMarkup(movies) {
    let releaseDate = 'No date';
    let movieGenres = [];
    let moviGenresNames = [];
    if (movies) {
      const libraryMovieCardMarkup = movies
        .reverse()
        .map(({ title, poster_path, release_date, genres, vote_average, id }) => {
          if (release_date && release_date !== '') {
            releaseDate = release_date.slice(0, 4);
          }
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
          }
          if (poster_path) {
            return `<li class="film-list__item" data-id="${id}">
                        <div class="film-list__poster">
                            <img src="https://image.tmdb.org/t/p/w500${poster_path}" loading=lazy alt="${title} poster" class="film-list__img" onerror="this.onerror=null;this.src='https://bflix.biz/no-poster.png'">
                            <div class="film-list__icons">
                                <button class="gallery-button watch" data-add='watched' aria-label='add movie watched' data-id="${id}"></button>
                                <button class="gallery-button remove" data-remove='queue' aria-label='remove movie queue' data-id="${id}"></button>
                            </div>
                        </div>
                        <div class="film-list__description">
                            <h2 class="film-list__title">${title}</h2>
                                <p class="film-list__genres">${moviGenresNames.join(
                                  ', ',
                                )}<span> | </span>${releaseDate}</p>
                                <p class="film-list__rating">${vote_average.toFixed(1)}</p>
                            </div>
                        </li>`;
          } else {
            return `<li class="film-list__item" data-id="${id}">
                        <div class="film-list__poster">      
                            <img src="https://bflix.biz/no-poster.png" loading=lazy alt="${title} poster" class="film-list__img" onerror="this.onerror=null;this.src='https://bflix.biz/no-poster.png'">
                            <div class="film-list__icons">
                                <button class="gallery-button watch" data-add='watched' aria-label='add movie watched' data-id="${id}"></button>
                                <button class="gallery-button remove" data-remove='queue' aria-label='remove movie queue' data-id="${id}"></button>
                            </div>
                        </div>
                        <div class="film-list__description">
                            <h2 class="film-list__title">${title}</h2>
                                <p class="film-list__genres">${moviGenresNames.join(
                                  ' ',
                                )}<span> | </span>${releaseDate}</p>
                                <p class="film-list__rating">${vote_average.toFixed(1)}</p>
                            </div>
                        </li>`;
          }
        })
        .join('');

      return libraryMovieCardMarkup;
    }
  }

  makeMovieDetailMarkup({
    poster_path,
    title,
    vote_average,
    vote_count,
    popularity,
    original_title,
    genres,
    overview,
    id,
  }) {
    let movieDetailMarkup;
    let moviGenresNames;
    const moveiGenres = genres.map(genre => genre.name);
    if (moveiGenres.length === 0) {
            moviGenresNames = moveiGenres.slice(0, 1);
            moviGenresNames.splice(0, 0, 'No genre');
    } else {
      moviGenresNames = moveiGenres;
    }
    if (poster_path) {
      movieDetailMarkup = `
        <div class="modal-gallery__thumb">
            <img src="https://image.tmdb.org/t/p/original${poster_path}" alt="${title} poster" onerror="this.onerror=null;this.src='https://bflix.biz/no-poster.png'" />
        </div>
        <div class="modal-gallery__thumb-text">
            <h2 class="modal-gallery__title">${title}</h2>
            <ul class="modal-gallery-list">
                <li class="modal-gallery-list__item">
                    <div class="modal-gallery-item__name">Vote / Votes</div>
                    <div class="modal-gallery-item__value">
                        <span class="modal-gallery-list__vote">${vote_average.toFixed(1)}</span>&nbsp;/
                        <span class="modal-gallery-list__votes modal-gallery-item__value">${vote_count}</span>
                    </div>
                </li>
                <li class="modal-gallery-list__item">
                    <div class="modal-gallery-item__name">Popularity</div>
                    <div class="modal-gallery-list__popularity modal-gallery-item__value">${popularity.toFixed(1)}</div>
                </li>
                <li class="modal-gallery-list__item">
                    <div class="modal-gallery-item__name">Original Title</div>
                    <div class="modal-gallery-list__title modal-gallery-item__value">${original_title}</div>
                </li>
                <li class="modal-gallery-list__item">
                    <div class="modal-gallery-item__name">Genre</div>
                    <div class="modal-gallery-list__genre modal-gallery-item__value">${moviGenresNames.join(', ')}</div>
                </li>
            </ul>
            <article class="modal-gallery-about">
                <h3 class="modal-gallery-about__title">About</h3>
                <p class="modal-gallery-about__text">${overview}</p>
            </article>
            <div class="modal-gallery-buttons__thumb">
                <button class="button modal-gallery-button" data-add="watched" aria-label='add movie watched' data-id="${id}">Add to watched</button>
                <button class="button modal-gallery-button" data-add="queue" aria-label='add movie queue' data-id="${id}">Add to queue</button>
            </div>
        </div>`;
    } else {
      movieDetailMarkup = `
        <div class="modal-gallery__thumb">
            <img src="https://bflix.biz/no-poster.png" alt="${title} poster" onerror="this.onerror=null;this.src='https://bflix.biz/no-poster.png'" />
        </div>
        <div class="modal-gallery__thumb-text">
            <h2 class="modal-gallery__title">${title}</h2>
            <ul class="modal-gallery-list">
                <li class="modal-gallery-list__item">
                    <div class="modal-gallery-item__name">Vote / Votes</div>
                    <div class="modal-gallery-item__value">
                        <span class="modal-gallery-list__vote">${vote_average.toFixed(1)}</span>&nbsp;/
                        <span class="modal-gallery-list__votes modal-gallery-item__value">${vote_count}</span>
                    </div>
                </li>
                <li class="modal-gallery-list__item">
                    <div class="modal-gallery-item__name">Popularity</div>
                    <div class="modal-gallery-list__popularity modal-gallery-item__value">${popularity.toFixed(1)}</div>
                </li>
                <li class="modal-gallery-list__item">
                    <div class="modal-gallery-item__name">Original Title</div>
                    <div class="modal-gallery-list__title modal-gallery-item__value">${original_title}</div>
                </li>
                <li class="modal-gallery-list__item">
                    <div class="modal-gallery-item__name">Genre</div>
                    <div class="modal-gallery-list__genre modal-gallery-item__value">${moviGenresNames.join(', ')}</div>
                </li>
            </ul>
            <article class="modal-gallery-about">
                <h3 class="modal-gallery-about__title">About</h3>
                <p class="modal-gallery-about__text">${overview}</p>
            </article>
            <div class="modal-gallery-buttons__thumb">
                <button class="button modal-gallery-button" data-add="watched" aria-label='add movie watched' data-id="${id}">Add to watched</button>
                <button class="button modal-gallery-button" data-add="queue" aria-label='add movie queue' data-id="${id}">Add to queue</button>
            </div>
        </div>`;
    }

    return movieDetailMarkup;
  }
}

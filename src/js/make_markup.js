// реализация запросов фильмов watched и queue с локалсторидж (или в будущем с firebase)
// скрипт возвращает массивы популярных фильмов, поиск по имени, фильм по id
import FetchMoviesApiService from "./fetch_movies_api";
const fetchMoviesApiService = new FetchMoviesApiService();

export default class MakeMarkup {

    makeMovieCardMarkup(movies) {
        let genres = [];
        let releaseDate = "No date";
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
                return `<li class="film-list__item" data-id="${id}">
                    <img src="https://image.tmdb.org/t/p/w500${poster_path}" loading=lazy alt="${title} poster" class="film-list__img" onerror="this.onerror=null;this.src='https://bflix.biz/no-poster.png'">
                    <div class="film-list__description">
                        <h2 class="film-list__title">${title}</h2>
                        <p class="film-list__genres">${Object.values(genres).join(', ')}<span> | </span>${releaseDate}</p>
                    </div>
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
                        <img src="https://image.tmdb.org/t/p/w500${poster_path}" loading=lazy alt="${title} poster" class="film-list__img" onerror="this.onerror=null;this.src='https://bflix.biz/no-poster.png'">
                        <div class="film-list__description">
                            <h2 class="film-list__title">${title}</h2>
                                <p class="film-list__genres">${Object.values(genres).join(', ')}<span> | </span>${releaseDate}</p>
                                <p class="film-list__rating">${vote_average}</p>
                            </div>
                        </li>`
            }).join('');
    
    return libraryMovieCardMarkup;
    };

    makeMovieDetailMarkup({poster_path, title, vote_average, vote_count, popularity, original_title, genres, overview}) {
        const movieDetailMarkup = `
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
                <button class="button modal-gallery-button">Add to watched</button>
                <button class="button modal-gallery-button modal-button__queue">Add to queue</button>
            </div>
        </div>`;
    
        return movieDetailMarkup;
    };
};
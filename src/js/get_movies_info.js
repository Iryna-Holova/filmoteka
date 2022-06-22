// скрипт возвращает массивы популярных фильмов, поиск по имени, фильм по id
import Notiflix from 'notiflix';
import FetchMoviesApiService from "./fetch_movies_api";
const fetchMoviesApiService = new FetchMoviesApiService();

export default class GetMoviesInfo {
    constructor() {
        this.page = 1;
        this.searchQuery = '';
    };

    async searchTrendingsMovies() {
        const response = await fetchMoviesApiService.fetchTrendingMovies(this.page);
        let genres = JSON.parse(localStorage.getItem('genres'));
        if (!genres) {
            genres = await fetchMoviesApiService.fetchGenres();
        }
        this.#getGenres(response, genres);
        this.incrementPage();

        return response.results;
    };

    async searchMoviesByName() {
        const response = await fetchMoviesApiService.fetchMoviesByName(this.searchQuery, this.page);
        let genres = JSON.parse(localStorage.getItem('genres'));
        if (!genres) {
            genres = await fetchMoviesApiService.fetchGenres();
        }
        this.#getGenres(response, genres);
        this.incrementPage();

        return response.results;
    };

    async searchMovieByID(id) {
        try {
            const response = await fetchMoviesApiService.fetchMovieByID(id);
            return response;
        } catch (error) {
            Notiflix.Notify.failure(error.message);
        };
    };

    #getGenres(movies, genres) {
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
    
    incrementPage() {
        this.page += 1;
    };

    resetPage() {
        this.page = 1;
    };

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
};
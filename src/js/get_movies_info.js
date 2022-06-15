// скрипт возвращает массивы популярных фильмов, поиск по имени, фильм по id
import FetchMoviesApiService from "./fetch_movies_api";
const fetchMoviesApiService = new FetchMoviesApiService();

export default class GetMoviesInfo {

    async searchTrendingsMovies() {
        try {
            const response = await fetchMoviesApiService.fetchTrendingMovies();
            const genres = await fetchMoviesApiService.fetchGenres();
            this.#getGenres(response, genres);

            return response.results;
        } catch (error) {
            console.log(error.message);
        };
    };

    async searchMoviesByName(movieName) {
        try {
            const response = await fetchMoviesApiService.fetchMoviesByName(movieName);
            const genres = await fetchMoviesApiService.fetchGenres();
            this.#getGenres(response, genres);
            
            return response.results;
        }
        catch (error) {
            console.log(error.message);
        };
    };

    async searchMovieByID(id) {
        try {
            const response = await fetchMoviesApiService.fetchMovieByID(id);
            
            return response;
        } catch (error) {
            console.log(error.message);
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

    #movieDetail(poster_path, title, vote_average, vote_count, popularity, original_title, genres, overview) {
        const movieDetail = {
            title,
            poster: poster_path,
            rating: vote_average,
            votes: vote_count,
            popularity,
            original_title,
            genres,
            about: overview,
        };

        return movieDetail;
    };    
};
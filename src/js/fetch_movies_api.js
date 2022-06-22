// скрипт генерации запросов на сервер - популярные, по имени и по айди
import axios from 'axios';

const URL = 'https://api.themoviedb.org/3';
const API_KEY = '8b67a89c3b3cf87de76d1484537ca872';
axios.defaults.baseURL = URL;

export default class FetchMoviesApiService {

    async fetchTrendingMovies(page) {
        const response = await axios.get(`/trending/movie/week?api_key=${API_KEY}&page=${page}`);
        return response.data;
    };

    async fetchMoviesByName(query, page) {
        const searchParams = new URLSearchParams({
            language: 'en-US',
            page,
            include_adult: false,
        });
        const response = await axios.get(`/search/movie?api_key=${API_KEY}&query=${query}&${searchParams}`);
        return response.data;
    };

    async fetchMovieByID(movieID) {
        const response = await axios.get(`/movie/${movieID}?api_key=${API_KEY}`);
        return response.data;
    };

    async fetchGenres() {
        const response = await axios.get(`/genre/movie/list?api_key=${API_KEY}`);
        localStorage.setItem('genres', JSON.stringify(response.data.genres)); 
        return response.data.genres;
    };
}
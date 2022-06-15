// скрипт генерации запросов на сервер - популярные, по имени и по айди
import axios from 'axios';

const URL = 'https://api.themoviedb.org/3';
const API_KEY = '8b67a89c3b3cf87de76d1484537ca872';
axios.defaults.baseURL = URL;

export default class FetchMoviesApiService {
    constructor() {
        this.page = 1;
    };

    async fetchTrendingMovies() {
        const response = await axios.get(`/trending/movie/week?api_key=${API_KEY}`);
        this.incrementPage();

        return response.data;
    };

    async fetchMoviesByName(movieName) {
        const searchParams = new URLSearchParams({
            language: 'en-US',
            page: this.page,
            include_adult: false,
        });
        
        const response = await axios.get(`/search/movie?api_key=${API_KEY}&query=${movieName}&${searchParams}`);
        this.incrementPage();

        return response.data;
    };

    async fetchMovieByID(movieID) {
        const response = await axios.get(`/movie/${movieID}?api_key=${API_KEY}`);
        this.incrementPage();

        return response.data;
    };

    async fetchGenres() {
        const response = await axios.get(`/genre/movie/list?api_key=${API_KEY}`);
        return response.data.genres;
    };

    incrementPage() {
        this.page += 1;
    };

    resetPage() {
        this.page = 1;
    };
}
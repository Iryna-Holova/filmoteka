// скрипт генерации запросов на сервер - популярные, по имени и по айди

import axios from 'axios';

const URL = 'https://api.themoviedb.org/3';
const API_KEY = '8b67a89c3b3cf87de76d1484537ca872';


export default class FetchMoviesApiService {
    constructor() {
        this.page = 1;
    }

    fetchTrendingMovies() {
        return axios.get(`${URL}/trending/movie/week?api_key=${API_KEY}`)
            .then(response => {
                this.incrementPage();

                return response.data;
            });
    };

    fetchMoviesByName(movieName) {
        const searchParams = new URLSearchParams({
            language: 'en-US',
            page: this.page,
            include_adult: false,
        }); 
        
        return axios.get(`${URL}/search/movie?api_key=${API_KEY}&query=${movieName}&${searchParams}`)
            .then(response => {
                this.incrementPage();

                return response.data;
            });
    }

    fetchMovieByID(movieID) {
        return axios.get(`${URL}/movie/${movieID}?api_key=${API_KEY}`)
            .then(response => {
                this.incrementPage();

                return response.data;
            });
    }

    incrementPage() {
        this.page += 1;
    };

    resetPage() {
        this.page = 1;
    };
}    
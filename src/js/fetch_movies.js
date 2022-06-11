// скрипт генерации запросов на сервер - популярные, по имени и по айди

const axios = require('axios');

const URL = 'https://api.themoviedb.org/3';
const API_KEY = '8b67a89c3b3cf87de76d1484537ca872';   


export default class FetchMoviesApiService {
    constructor() {
        this.movieName = '';
        this.movieID = 1;
        this.page = 1;
    }

    fetchTrendingMovies() {
        return axios.get(`${URL}/trending/movie/week?api_key=${API_KEY}`)
            .then(response => {
                this.incrementPage();

                return response.data;
            });
    };

    fetchMoviesByName() {
        const searchParams = new URLSearchParams({
            language: 'en-US',
            page: this.page,
            include_adult: false,
        }); 
        
        return axios.get(`${URL}/search/movie?api_key=${API_KEY}&query=${this.movieName}&${searchParams}`)
            .then(response => {
                this.incrementPage();

                return response.data;
            });
    }

    fetchMovieByID() {
        return axios.get(`${URL}/movie/${this.movieID}?api_key=${API_KEY}`)
            .then(response => response.data);
    }

    incrementPage() {
        this.page += 1;
    };

    resetPage() {
        this.page = 1;
    };

    get name() {
        return this.movieName;
    };

    set name(newName) {
        this.movieName = newName;
    };

    get id() {
        return this.movieID;
    };

    set id(newID) {
        this.movieID = newID;
    };
}    
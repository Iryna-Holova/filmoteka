// скрипт генерации запросов на сервер - популярные, по имени и по айди

export { fetchTrendingMovies, fetchMoviesByName, fetchMovieByID };

const URL = 'https://api.themoviedb.org/3';
const API_KEY = '8b67a89c3b3cf87de76d1484537ca872';

async function fetchTrendingMovies() {

    const response = await fetch(`${URL}/trending/movie/week?api_key=${API_KEY}`);
    return response.json();
}

async function fetchMoviesByName() {
        console.log('fetchMoviesByName работает');
}
    
async function fetchMovieByID() {
        console.log('fetchMovieByID работает');
    }

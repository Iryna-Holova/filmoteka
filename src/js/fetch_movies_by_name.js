// скрипт рендерит список фильмов по ключевому слову, использует запрос с fetch_movies

import FetchMoviesApiService from "./fetch_movies";
import getRefs from './refs';

const fetchMoviesApiService = new FetchMoviesApiService();
const refs = getRefs();

// refs.searchForm.addEventListener('submit', onSearch);

async function onSearch(event) {
    event.preventDefault();

    // clearMovieList();

    fetchMoviesApiService.name = event.currentTarget.elements.searchQuery.value;
    fetchMoviesApiService.resetPage();

    try {
        const movies = await fetchMoviesApiService.fetchMoviesByName();
    } catch (error) {
        console.log(error.message);
    }

    


};

function clearMovieList() { };
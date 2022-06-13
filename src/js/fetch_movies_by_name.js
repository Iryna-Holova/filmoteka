// скрипт рендерит список фильмов по ключевому слову, использует запрос с fetch_movies

import FetchMoviesApiService from "./fetch_movies";
const fetchMoviesApiService = new FetchMoviesApiService();
const refs = {
    gallery: document.querySelector('.film-list'),
};

 async function onSearch(event) {
    event.preventDefault();

    clearMovieList();

    const movieName = event.currentTarget.elements.searchQuery.value.trim();
    fetchMoviesApiService.resetPage();

    try {
        const movies = await fetchMoviesApiService.fetchMoviesByName(movieName);
      
    } catch (error) {
        console.log(error.message);
    }
};

function clearMovieList() {
    refs.gallery.innerHTML = '';
};
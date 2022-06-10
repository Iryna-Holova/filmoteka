// скрипт рендерит список популярных фильмов, использует запрос с fetch_movies

import { fetchTrendingMovies } from "./fetch_movies";

function onSearch() {
    fetchTrendingMovies()
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

onSearch();
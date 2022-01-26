const API_KEY = '61d280fbc4e0ab3fee827783c53f7600';
const BASE_URL = 'https://api.themoviedb.org/3/';
const axios = require('axios');

async function fetchMoviesSearch(query, page) {
  const movies = await axios.get(
    `${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}&page=${page}`,
  );
  return movies.data;
}

export default { fetchMoviesSearch };

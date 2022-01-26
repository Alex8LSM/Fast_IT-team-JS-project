const API_KEY = '61d280fbc4e0ab3fee827783c53f7600';
const BASE_URL = 'https://api.themoviedb.org/3/';
const axios = require('axios');

async function fetchMoviesById(id) {
  const movie = await axios.get(`${BASE_URL}movie/${id}?api_key=${API_KEY}`);
  return movie.data;
}

export default { fetchMoviesById };

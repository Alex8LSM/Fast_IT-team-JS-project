const BASE_URL = 'https://api.themoviedb.org/3/';
const KEY = '61d280fbc4e0ab3fee827783c53f7600';
const axios = require('axios');

export default class ApiMovie {
  constructor() {
    this.page = 1;
    this.totalPages = 1000;
  }

  async fetchTrendyMovie() {
    const trendyMovieUrl = `${BASE_URL}trending/movie/day?api_key=${KEY}&page=${this.page}`;
    const fetch = await axios.get(trendyMovieUrl);
    const trendyMovies = fetch.data.results;
    this.totalPages=fetch.data.total_pages
    return trendyMovies;
  }

  async fetchGenres() {
    const genreUrl = `${BASE_URL}genre/movie/list?api_key=${KEY}&language=en-US`;
    const fetchGenre = await axios.get(genreUrl);
    const listOfGenres = fetchGenre.data.genres;

    return listOfGenres;
  }

  putGenresAndCutReleaseDateToYear() {
    return this.fetchTrendyMovie().then(data => {
      return this.fetchGenres().then(listOfGenres => {
        return data.map(movie => ({
          ...movie,
          release_date: movie.release_date.slice(0, 4),
          genres: movie.genre_ids.slice(0,3).map(id => listOfGenres.filter(genre => genre.id === id)).flat(),
        }));
      });
    });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  pageSet(num) {
    this.page=num
  }
}

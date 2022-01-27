import apiSearch from './apiMoviesSearch';
import moviesTpl from '../partials/templates/filmCard.hbs';
import ApiMovie from '/js/apiMovie';
const searchMovies = new ApiMovie();
import Notiflix from 'notiflix';
import { PaginationButton } from './paginationPages';
import { scrolledToTop } from './upButton';

let searchQuery = '';
let totalPages = 10;
let pageC = 1;

const refs = {
  form: document.querySelector('.search'),
  div: document.querySelector('.main-container'),
  container: document.querySelector('.main-container-films'),
};

refs.form.addEventListener('submit', onSearchMovies);

async function onSearchMovies(e) {
  e.preventDefault();
  const query = e.currentTarget.elements.query.value.trim();
  let page = 1;
  searchQuery = query;

  try {
    if (query.length <= 1) {
      Notiflix.Notify.failure(`Search result not successful.Enter the correct movie name.`);
      return;
    }

    const movies = await apiSearch
      .fetchMoviesSearch(searchQuery, page)
      .then(({ total_pages, results }) => {
        totalPages = total_pages;
        return searchMovies.fetchGenres().then(listOfGenres => {
          return results.map(movie => ({
            ...movie,
            release_date: movie.release_date.slice(0, 4),
            genres: movie.genre_ids.map(id => listOfGenres.filter(genre => genre.id === id)).flat(),
          }));
        });
      });

    if (movies.length === 0) {
      return Notiflix.Notify.failure(`Search result not successful.Enter the correct movie name.`);
    }
    renderMovies(movies);
    newPagination(totalPages);
  } catch (error) {}
}

function renderMovies(movies) {
  refs.container.innerHTML = '';
  const markup = moviesTpl(movies);
  refs.container.insertAdjacentHTML('beforeend', markup);
}

function newPagination(totalPages) {
  if (document.querySelector('.pagination-buttons-set')) {
    document.querySelector('.pagination-buttons-set').innerHTML = '';
    document.querySelector('.pagination-buttons-set').remove();
  }

  if (totalPages < 2) {
    return;
  }

  if (totalPages === 2) {
    const paginationSearch = new PaginationButton(totalPages, 2, '-set', pageC);
    paginationSearch.render();
    paginationSearch.onChange(e => {
      let pageCurent = e.target.value;
      apiMoviRender(pageCurent);
      scrolledToTop(scrollY);
    });
  } else if (totalPages > 2 && totalPages < 5) {
    const paginationSearch = new PaginationButton(totalPages, 3, '-set', pageC);
    paginationSearch.render();
    paginationSearch.onChange(e => {
      let pageCurent = e.target.value;
      apiMoviRender(pageCurent);
      scrolledToTop(scrollY);
    });
  } else {
    const paginationSearch = new PaginationButton(totalPages, 5, '-set', pageC);
    paginationSearch.render();
    paginationSearch.onChange(e => {
      let pageCurent = e.target.value;
      apiMoviRender(pageCurent);
      scrolledToTop(scrollY);
    });
  }
}

async function apiMoviRender(page) {
  const movi = await apiSearch
    .fetchMoviesSearch(searchQuery, page)
    .then(({ total_pages, results }) => {
      totalPages = total_pages;
      return searchMovies.fetchGenres().then(listOfGenres => {
        return results.map(movie => ({
          ...movie,
          release_date: movie.release_date.slice(0, 4),
          genres: movie.genre_ids.map(id => listOfGenres.filter(genre => genre.id === id)).flat(),
        }));
      });
    });

  renderMovies(movi);
}

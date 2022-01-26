const axios = require('axios');
import { removePagination } from './paginationPages';
import filmCardTpl from '../partials/templates/filmCard.hbs';
const watchedBtn = document.querySelector('.header-watched');
const queueBtn = document.querySelector('.header-queue');
const filmContainer = document.querySelector('.main-container-films');

queueBtn.addEventListener('click', onQueueBtnClick);
watchedBtn.addEventListener('click', onWatchedBtnClick);

const emptyTitle = document.querySelector('.container-empty__title');
const emptyImage = document.querySelector('.container-empty__image');

async function onWatchedBtnClick() {
  watchedBtn.classList.add('active');
  queueBtn.classList.remove('active');
  const STORAGE_KEY = 'watched';
  const WatchedIds = JSON.parse(localStorage.getItem(STORAGE_KEY));
   if (WatchedIds === null || WatchedIds.length === 0) {
     emptyTitle.classList.add('visible');
     emptyImage.classList.add('visible');
   } else {
     emptyTitle.classList.remove('visible');
     emptyImage.classList.remove('visible');
   }
  const moviesWatchedList = [];
  if (WatchedIds !== null) {
    for (const id of WatchedIds) {
      moviesWatchedList.push(await fetchMovie(id));
    }
    markupMovies(moviesWatchedList);
  }
}
async function onQueueBtnClick() {
  queueBtn.classList.add('active');
  watchedBtn.classList.remove('active');

  const STORAGE_KEY = 'queue';

  const QueueIds = JSON.parse(localStorage.getItem(STORAGE_KEY));

   if (QueueIds === null || QueueIds.length === 0) {
     emptyTitle.classList.add('visible');
     emptyImage.classList.add('visible');
   } else {
     emptyTitle.classList.remove('visible');
     emptyImage.classList.remove('visible');
   }

  const moviesQueueList = [];

  if (QueueIds !== null) {
    for (const id of QueueIds) {
      moviesQueueList.push(await fetchMovie(id));
    }

    markupMovies(moviesQueueList);
  }
}

function markupMovies(movies) {
  removePagination();
  filmContainer.innerHTML = '';

  const markup = filmCardTpl(movies);
  filmContainer.insertAdjacentHTML('beforeend', markup);
}

async function fetchMovie(id) {
  const API_KEY = '61d280fbc4e0ab3fee827783c53f7600';
  const BASE_URL = 'https://api.themoviedb.org/3/';

  try {
    const response = await axios(`${BASE_URL}movie/${id}?api_key=${API_KEY}&language=en-US`);
    const movieData = response.data;
    const newMovieData = {
      ...movieData,
      release_date: movieData.release_date.slice(0, 4),
      genres: movieData.genres.slice(0, 3),
    };
    return newMovieData;
  } catch (error) {
    console.log(error);
  }
}

export { onQueueBtnClick, onWatchedBtnClick };

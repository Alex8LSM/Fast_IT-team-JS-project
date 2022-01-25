const axios = require('axios');
import filmCardTpl from '../partials/templates/filmCard.hbs';

  const watchedBtn = document.querySelector('.header-watched');
  const queueBtn = document.querySelector('.header-queue');
  const filmContainer = document.querySelector('.main-container-films');

  
  queueBtn.addEventListener('click', onQueueBtnClick);
  watchedBtn.addEventListener('click', onWatchedBtnClick);


async function onQueueBtnClick() {
  const STORAGE_KEY = 'queue';

  const QueueIds = JSON.parse(localStorage.getItem( STORAGE_KEY ));
  
  const moviesQueueList = [];
  
  if (QueueIds !== null) {
    for (const id of QueueIds) {
      moviesQueueList.push(await fetchMovie(id));
    }
  
    markupMovies(moviesQueueList);
  }
}

async function onWatchedBtnClick() {
  const STORAGE_KEY = 'watched';

  const WatchedIds = JSON.parse(localStorage.getItem( STORAGE_KEY ));

  const moviesWatchedList = [];
  
  if (WatchedIds !== null) {
    for (const id of WatchedIds) {
      moviesWatchedList.push(await fetchMovie(id));
    }

    markupMovies(moviesWatchedList);
  }
}

function markupMovies(movies) {
  filmContainer.innerHTML = '';
  const paginationEmpty = document.querySelector('.pagination-buttons-desktop');
  paginationEmpty.classList.add('visually-hidden');
  const markup = filmCardTpl(movies);
  filmContainer.insertAdjacentHTML('beforeend', markup);
}

async function fetchMovie(id) {

  const API_KEY = '61d280fbc4e0ab3fee827783c53f7600';
  const BASE_URL = 'https://api.themoviedb.org/3/';

  try {
    const response = await axios(`${BASE_URL}movie/${id}?api_key=${API_KEY}&language=en-US`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export { onQueueBtnClick, onWatchedBtnClick };
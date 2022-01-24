import renderTpl from '../partials/templates/filmCard.hbs';

    const refs = {
        watchedBtn: document.querySelector('.header-watched'),
        queueBtn: document.querySelector('.header-queue'),
        container: document.querySelector('.main-container')
    }

    refs.queueBtn.addEventListener('click', onQueueBtnClick);
    refs.watchedBtn.addEventListener('click', onWatchedBtnClick);


async function onQueueBtnClick() {
  
  const QueueIds = JSON.parse(localStorage.getItem('queue'));
  
  const moviesQueueList = [];
  
  if (QueueIds !== null) {
    for (const id of QueueIds) {
        moviesQueueList.push(await fetchMovie(id));
    }
  
    markupMovies(moviesQueueList);
  }
}

async function onWatchedBtnClick() {

  const WatchedIds = JSON.parse(localStorage.getItem('watched'));

  const moviesWatchedList = [];
  
  if (WatchedIds !== null) {
    for (const id of WatchedIds) {
      moviesWatchedList.push(await fetchMovie(id));
    }

    markupMovies(moviesWatchedList);
  }
}

function markupMovies(movies) {
    refs.container.innerHTML = '';
    refs.container.insertAdjacentHTML('beforeend', renderTpl(movies));
}

async function fetchMovie(id) {
  const API_KEY = '61d280fbc4e0ab3fee827783c53f7600';
  const BASE_URL = 'https://api.themoviedb.org/3/';

    const response = await fetch(
  `https:${BASE_URL}movie/${id}?api_key=${API_KEY}`,
    );
    return await response.json();
}

export { onQueueBtnClick, onWatchedBtnClick };
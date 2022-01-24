import apiSearch from './apiMoviesSearch';
import moviesTpl from '../partials/templates/filmCard.hbs';
import ApiMovie from '/js/apiMovie';
const searchMovies = new ApiMovie();
  
const refs = {
    form: document.querySelector('.search'),
    div: document.querySelector('.main-container'),
    container:document.querySelector('.main-container-films'),
  };

refs.form.addEventListener('submit', onSearchMovies);

async function onSearchMovies(e) {
    e.preventDefault();
    const query = e.currentTarget.elements.query.value.trim();
    let page = 1;

   const movies = await apiSearch.fetchMoviesSearch(query, page).then(data => {
   return searchMovies.fetchGenres().then(listOfGenres => {
     return data.map(movie => ({
       ...movie,
       release_date: movie.release_date.slice(0, 4),
       genres: movie.genre_ids.map(id => listOfGenres.filter(genre => genre.id === id)).flat(),
     }));
   });
  });
   renderMovies(movies);
}

function renderMovies(movies) { 
  refs.container.innerHTML=""
  const markup = moviesTpl(movies);
  refs.container.insertAdjacentHTML('beforeend', markup);
}
 




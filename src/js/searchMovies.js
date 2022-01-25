import apiSearch from './apiMoviesSearch';
import moviesTpl from '../partials/templates/filmCard.hbs';
import ApiMovie from '/js/apiMovie';
const searchMovies = new ApiMovie();
import {PaginationButton} from './paginationSearch'

let searchMovi = "";
let pageOnRender = 1;
let totalPagesSearch = 3;
const refs = {
    form: document.querySelector('.search'),
    div: document.querySelector('.main-container'),
    container: document.querySelector('.main-container-films'),
};

refs.form.addEventListener('submit', (e) => {
  e.preventDefault();
  pageOnRender = 1;
  searchMovi = e.currentTarget.elements.query.value.trim();
  onSearchMovies();
  console.log(pageOnRender);
} );

function onSearchMovies() {
  apiMoviesRender()
  window.addEventListener('resize', () => {
    renderPagesSearch()
    console.log(pageOnRender);
})
}


async function apiMoviesRender() {
   const movies = await apiSearch.fetchMoviesSearch(searchMovi,pageOnRender).then(({results,total_pages}) => {
    totalPagesSearch = total_pages;
    return searchMovies.fetchGenres().then(listOfGenres => {
    return results.map(movie => ({
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
  renderPagesSearch();
}

function renderPagesSearch() {
    // if(totalPagesSearch<2){return}
    if (document.querySelector(".pagination-buttons-desktop")) {
      document.querySelector(".pagination-buttons-desktop").innerHTML = ""
      document.querySelector(".pagination-buttons-desktop").remove()
    }

    if (document.querySelector(".pagination-buttons-mob")) {
      document.querySelector(".pagination-buttons-mob").innerHTML = ""
      document.querySelector(".pagination-buttons-mob").remove()
    }

    let swCurrent = window.innerWidth;
    
  if (swCurrent < 767) {
    
    if (document.querySelector(".pagination-buttons-mobS")) { return }

    if (document.querySelector(".pagination-buttons-desktopS")) {
      document.querySelector(".pagination-buttons-desktopS").innerHTML = ""
      document.querySelector(".pagination-buttons-desktopS").remove()
    }
      
      const paginationButtons = new PaginationButton(totalPagesSearch, 3,"-mobS", pageOnRender);

      paginationButtons.render();
     
      paginationButtons.onChange(e => {
       let pageCurent = e.target.value;
        pageOnRender = pageCurent;
        paginSearchPage()
        
      });
    
  } else {
    
    if (document.querySelector(".pagination-buttons-desktopS")) { return };
    if (document.querySelector(".pagination-buttons-mobS")) {
      document.querySelector(".pagination-buttons-mobS").innerHTML = ""
      document.querySelector(".pagination-buttons-mobS").remove()
    }
      
      const paginationButtons = new PaginationButton(totalPagesSearch, 5,"-desktopS",pageOnRender);

    paginationButtons.render();

    paginationButtons.onChange(e => {
    let pageCurent = e.target.value;
        pageOnRender = pageCurent;
        paginSearchPage()
      }); 
  }
}

async function paginSearchPage() {
  
  const movies = await apiSearch.fetchMoviesSearch(searchMovi,pageOnRender).then(({results}) => {
     
     return searchMovies.fetchGenres().then(listOfGenres => {
     return results.map(movie => ({
       ...movie,
       release_date: movie.release_date.slice(0, 4),
       genres: movie.genre_ids.map(id => listOfGenres.filter(genre => genre.id === id)).flat(),
     }));
   });
  });
   renderMovies(movies);
}


import ApiMovie from '/js/apiMovie';
import filmCardTpl from '../partials/templates/filmCard.hbs';
const trendyMovie = new ApiMovie();
import { renderPages } from './paginationPages';
//
const card = document.querySelector('.main-container');
const logoEl = document.querySelector('.logo');
logoEl.addEventListener('click', onLogoClick);

function onLogoClick(e) {
  e.preventDefault();
  renderMainPage();
}

export function renderMainPage() {

    trendyMovie.putGenresAndCutReleaseDateToYear()     

    .then(renderFilmsCard)
    .catch(error => {
      console.log(error);
    });
}


export function renderFilmsCard(trendyMovies) {  
  card.innerHTML = "";
  const markup = filmCardTpl(trendyMovies)
  card.insertAdjacentHTML('beforeend', markup)
  renderPages();
}

import ApiMovie from '/js/apiMovie';
import filmCardTpl from '../partials/templates/filmCard.hbs';
const trendyMovie = new ApiMovie();
import { renderPages } from './paginationPages';

const card = document.querySelector('.main-container');
const logoEl = document.querySelector('.logo');
logoEl.addEventListener('click', onLogoClick);

const filmContainer = document.createElement('div');
  filmContainer.className = `main-container-films`;

renderMainPage();

function onLogoClick(e) {
  renderMainPage();
}

export function renderMainPage() {
  trendyMovie.page = 1;
  trendyMovie
    .putGenresAndCutReleaseDateToYear()
    .then(renderFilmsCard)
    .catch(error => {
      console.log(error);
    });
}

export function renderFilmsCard(trendyMovies) {
  card.innerHTML=""
  const markup = filmCardTpl(trendyMovies);
  card.appendChild(filmContainer).insertAdjacentHTML('beforeend', markup);
  renderPages(trendyMovie.totalPages);

}

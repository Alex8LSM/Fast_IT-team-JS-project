import ApiMovie from '/js/apiMovie';
import filmCardTpl from '../partials/templates/filmCard.hbs';
const trendyMovie = new ApiMovie();
import { renderPages } from './paginationPages';

const card = document.querySelector('.main-container');
const logoEl = document.querySelector('.logo');
const homeEl = document.getElementById('userHome');
logoEl.addEventListener('click', onLogoClick);
homeEl.addEventListener('click', onHomeClick);

const filmContainer = document.querySelector('.main-container-films');

renderMainPage();
function onHomeClick(e) {
  renderMainPage();
}
function onLogoClick(e) {
  renderMainPage();
}

export function renderMainPage() {
  trendyMovie
    .putGenresAndCutReleaseDateToYear()
    .then(renderFilmsCard)
    .catch(error => {
      console.log(error);
    });
}

export function renderFilmsCard(trendyMovies) {
  filmContainer.innerHTML = '';
  const markup = filmCardTpl(trendyMovies);
  filmContainer.insertAdjacentHTML('beforeend', markup);
  renderPages(trendyMovie.totalPages);
}

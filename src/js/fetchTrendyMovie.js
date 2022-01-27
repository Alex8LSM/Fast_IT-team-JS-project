import ApiMovie from '/js/apiMovie';
import filmCardTpl from '../partials/templates/filmCard.hbs';
const trendyMovie = new ApiMovie();
import { PaginationButton } from './paginationPages';
import { scrolledToTop } from './upButton';

const card = document.querySelector('.main-container');
const logoEl = document.querySelector('.logo');
const homeEl = document.getElementById('userHome');
logoEl.addEventListener('click', onLogoClick);
homeEl.addEventListener('click', onHomeClick);

const filmContainer = document.querySelector('.main-container-films');
let totalPagesMain = 10;
renderMainPage();

function onHomeClick(e) {
  renderMainPage();
}
function onLogoClick(e) {
  renderMainPage();
}

export function renderMainPage() {
  setTimeout(() => {
    trendyMovie
      .putGenresAndCutReleaseDateToYear()
      .then(renderFilmsCard)
      .catch(error => {
        console.log(error);
      });
    totalPagesMain = trendyMovie.totalPages;
    newPaginationMain(trendyMovie.totalPages);
  }, 1000);
}

export function renderFilmsCard(trendyMovies) {
  filmContainer.innerHTML = '';
  const markup = filmCardTpl(trendyMovies);
  filmContainer.insertAdjacentHTML('beforeend', markup);
}

function newPaginationMain(totalPagesMain) {
  if (document.querySelector('.pagination-buttons-set')) {
    document.querySelector('.pagination-buttons-set').innerHTML = '';
    document.querySelector('.pagination-buttons-set').remove();
  }

  if (totalPagesMain < 2) {
    return;
  }

  if (totalPagesMain < 5) {
    const paginationMain = new PaginationButton(totalPagesMain, 3, '-set', trendyMovie.page);
    paginationMain.render();
    paginationMain.onChange(e => {
      let pageCurent = e.target.value;
      trendyMovie.pageSet(pageCurent);
      apiMoviesWithoutPaginator();
      scrolledToTop(scrollY);
    });
  } else {
    const paginationMain = new PaginationButton(totalPagesMain, 5, '-set', trendyMovie.page);
    paginationMain.render();
    paginationMain.onChange(e => {
      let pageCurent = e.target.value;
      trendyMovie.pageSet(pageCurent);
      apiMoviesWithoutPaginator();
      scrolledToTop(scrollY);
    });
  }
}

function apiMoviesWithoutPaginator() {
  trendyMovie
    .putGenresAndCutReleaseDateToYear()
    .then(renderFilmsCard)
    .catch(error => {
      console.log(error);
    });
}

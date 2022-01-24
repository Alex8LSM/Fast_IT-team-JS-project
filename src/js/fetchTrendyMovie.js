import ApiMovie from '/js/apiMovie';
import filmCardTpl from '../partials/templates/filmCard.hbs';
const trendyMovie = new ApiMovie();
import { renderPages } from './paginationPages';

const card = document.querySelector('.main-container');
const logoEl = document.querySelector('.logo');
logoEl.addEventListener('click', onLogoClick);

const filmContainer = document.querySelector('.main-container-films');

renderMainPage();

export function onLogoClick(e) {
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
    filmContainer.innerHTML = ""
    const markup = filmCardTpl(trendyMovies);
    filmContainer.insertAdjacentHTML('beforeend', markup);
    renderPages(trendyMovie.totalPages);

}
import ApiMovie from '/js/apiMovie';
import filmCardTpl from '../partials/templates/filmCard.hbs'
const trendyMovie = new ApiMovie();

const card = document.querySelector('.main-container');
const logoEl = document.querySelector('.logo');
logoEl.addEventListener('click', onLogoClick);
     
renderMainPage();

function onLogoClick(e) {
  e.preventDefault();
  renderMainPage();
}

export function renderMainPage() {
  trendyMovie.page = 1;
    trendyMovie.putGenresAndCutReleaseDateToYear()     
    .then(renderFilmsCard)
    .catch(error => {
      console.log(error)      
    });
}

function renderFilmsCard(trendyMovies) {    
    const markup = filmCardTpl(trendyMovies)
    card.insertAdjacentHTML('beforeend', markup)   
}


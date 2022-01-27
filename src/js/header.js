import { onLogoClick } from './fetchTrendyMovie';
import { onWatchedBtnClick} from './myLibrary';

function headerJS() {
  const headerPage = document.getElementById('headerMainPage');
  const libraryLink = document.getElementById('userlibrary');
  const homeLink = document.getElementById('userHome');
  const headerBtn = document.getElementById('headerButtons');
  const headerSearch = document.getElementById('headerSearch');
  const logoEl = document.getElementById('logo-link');

  logoEl.addEventListener('click', onLogoClick);

function onClickLibrary(e) {
    e.preventDefault();
    headerPage.classList.remove('main-page-header');
    headerPage.classList.add('header-library');
    headerBtn.classList.remove('hidden');
    headerSearch.classList.add('hidden');
    homeLink.classList.remove('current');
    libraryLink.classList.add('current');

    onWatchedBtnClick();
  }
  libraryLink.addEventListener('click', onClickLibrary);

  function onClickHome(e) {
    headerPage.classList.remove('header-library');
    headerPage.classList.add('main-page-header');
    headerSearch.classList.remove('hidden');
    headerBtn.classList.add('hidden');
    libraryLink.classList.remove('current');
    homeLink.classList.add('current');
  }

  homeLink.addEventListener('click', onClickHome);
}
export { headerJS };

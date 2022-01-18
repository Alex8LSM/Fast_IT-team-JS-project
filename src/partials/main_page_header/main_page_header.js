const header = document.getElementById('headerMainPage');

function headerMainPage() {
  return `<div class="container">
  <div class="wrapper">
    <a class="logo" href="./images/main_page_header/sprite.svg#film">
      <use class="logo__svg">
        <svg clsss="logo__img" src="" width="25px" height="25px"></svg>
      </use>
      <h1 class="logo__name">Filmoteka</h1>
    </a>
    <div class="user">
      <a class="user__home" href="">
        <p class="user__actions--current">HOME</p>
      </a>
      <a class="user__library" href="" id="userLibrary">
        <p class="user__actions">MY LIBRARY</p>
      </a>
    </div>
  </div>
  <div class="header__search">
    <form action="#" class="search">
      <input type="text" class="search__input" placeholder="Поиск фильмов" />
      <button class="search__button" type="submit">
        <svg class="search__icon">
          <use src="./images/main_page_header/search 2.svg"></use>
        </svg>
      </button>
    </form>
  </div>
</div>`;
}
function renderHeader() {
  header.innerHTML = headerMainPage();
}

export { renderHeader };

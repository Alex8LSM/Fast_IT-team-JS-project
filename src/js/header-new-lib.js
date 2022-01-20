function headerJS() {
    const headerPage = document.getElementById('headerMainPage');
    const libraryLink = document.getElementById('userlibrary');
    const homeLink = document.getElementById('userHome');
    const headerBtn = document.getElementById('headerButtons');
    const headerSearch = document.getElementById('headerSearch');

    function onClickLibrary(e) {
        e.preventDefault();
        headerPage.classList.remove('main-page-header');
        headerPage.classList.add('header-library');
        headerBtn.classList.remove('visually-hidden');
        headerSearch.classList.add('visually-hidden');
        homeLink.classList.remove('current');
        libraryLink.classList.add('current');
    }
    libraryLink.addEventListener("click", onClickLibrary);

    function onClickHome(e) {
        e.preventDefault();
        headerPage.classList.remove('header-library');
        headerPage.classList.add('main-page-header');
        headerSearch.classList.remove('visually-hidden');
        headerBtn.classList.add('visually-hidden');
        libraryLink.classList.remove('current');
        homeLink.classList.add('current');
    }

    homeLink.addEventListener("click", onClickHome);
}
export { headerJS };
// export { onClickLibrary }
// export { onClickHome }
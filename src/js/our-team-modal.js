import teamCard from '../templates/team-card.hbs';
import our_team_data from '../json/our-team.json';
function renderModal() {

  const refs = {
    show_Team: document.querySelector('[data-modal-open]'),
    btnModalclose: document.querySelector('[data-modal-close]'),
    myModal: document.querySelector('[data-modal]'),
    lockScroll: document.querySelector('[data-lockScroll]'),
    ourTeamModal: document.querySelector('.our-team__container'),
  };

  refs.show_Team.addEventListener('click', onModalOpen);
  refs.show_Team.addEventListener('click', showTeam),
  refs.btnModalclose.addEventListener('click', onModalClose);
  refs.myModal.addEventListener('click', onClickBackdrop);
 
  function onModalOpen() {
    window.addEventListener('keydown', onPressEsc);
    refs.myModal.classList.remove('myBackdrop--is-hidden');
    refs.lockScroll.classList.add('scroll-lock');
  }

  function onModalClose() {
    window.removeEventListener('keydown', onPressEsc);
    refs.myModal.classList.add('myBackdrop--is-hidden');
    refs.lockScroll.classList.remove('scroll-lock');
  }

  function onClickBackdrop(event) {
    if (event.currentTarget === event.target) {
      // console.log('Кликнули именно в бекдроп!!!!');
      onModalClose();
    }
  }

  function onPressEsc(event) {
    const ESC_KEY_CODE = 'Escape';
    const isEscKey = event.code === ESC_KEY_CODE;

    if (isEscKey) {
      onModalClose();
    }
  }

  function showTeam() {
    // console.log('our team');
    // console.log(our_team_data);
    const markup = teamCard(our_team_data);
    // ourTeamModal.insertAdjacentHTML('beforeend', markup);
    refs.ourTeamModal.innerHTML = markup;
  }
}
export { renderModal };

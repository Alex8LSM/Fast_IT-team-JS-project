import teamCard from '../templates/team-card.hbs';
import our_team_data from '../json/our-team.json';
function renderModal() {

  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    backdrop: document.querySelector('[data-modal]'),
    lockScroll: document.querySelector('[data-lockScroll]'),
  };

  refs.openModalBtn.addEventListener('click', onOpenModal);
  refs.closeModalBtn.addEventListener('click', onCloseModal);
  refs.backdrop.addEventListener('click', onBackdropClick);

  function onOpenModal() {
    window.addEventListener('keydown', onEscKeyPress);
    refs.backdrop.classList.remove('backdrop--is-hidden');
    refs.lockScroll.classList.add('scroll-lock');
  }

  function onCloseModal() {
    window.removeEventListener('keydown', onEscKeyPress);
    refs.backdrop.classList.add('backdrop--is-hidden');
    refs.lockScroll.classList.remove('scroll-lock');
  }

  function onBackdropClick(event) {
    if (event.currentTarget === event.target) {
      // console.log('Кликнули именно в бекдроп!!!!');
      onCloseModal();
    }
  }

  function onEscKeyPress(event) {
    const ESC_KEY_CODE = 'Escape';
    const isEscKey = event.code === ESC_KEY_CODE;

    if (isEscKey) {
      onCloseModal();
    }
  }

  const ourTeamModal = document.querySelector('.our-team__container');
  const show_Team = document.querySelector('.show-team');

  show_Team.addEventListener('click', showTeam);

  function showTeam() {
    // console.log('our team');
    // console.log(our_team_data);
    const markup = teamCard(our_team_data);
    // ourTeamModal.insertAdjacentHTML('beforeend', markup);
    ourTeamModal.innerHTML = markup;
  }
}
export { renderModal };

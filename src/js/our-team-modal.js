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

  function createTeam(teamData) {
    let cards = '';
    for (const member of teamData) {
      cards += `<li class="team-cards__card">
                <img
                  class="team-cards__image"
                  srcset='./images/our_team/${member.big_image}.jpg 2x'
                  src='./images/our_team/${member.small_image}.jpg'
                  width="450"
                  height="294"
                  alt="${member.alt}"
                  loading="lazy"
                />
                <div class="team-card">
                  <h3 class="team-card__title">${member.name}</h3>
                  <p class="team-card__profession">${member.role}</p>
                  <ul class="list-box social-icons team-card__social-icons">
                    <li class="list social-icons__list">
                      <a class="link social-icons__icon" href="${member.instagram}">
                        <svg class="team-card__social-icon" width="20px" height="20px">
                          <use href="./images/sprite.svg#instagram"></use>
                        </svg>
                      </a>
                    </li>

                    <li class="list social-icons__list">
                      <a class="link social-icons__icon" href="${member.twitter}">
                        <svg class="team-card__social-icon" width="20px" height="20px">
                          <use href="./images/sprite.svg#twitter"></use>
                        </svg>
                      </a>
                    </li>

                    <li class="list social-icons__list">
                      <a class="link social-icons__icon" href="${member.facebook}">
                        <svg class="team-card__social-icon" width="20px" height="20px">
                          <use href="./images/sprite.svg#facebook"></use>
                        </svg>
                      </a>
                    </li>

                    <li class="list social-icons__list">
                      <a class="link social-icons__icon" href="${member.linkedin}">
                        <svg class="team-card__social-icon" width="20px" height="20px">
                          <use href="./images/sprite.svg#linkedin"></use>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
    </li>`;
    }
    const markup = `<ul class="list-box team-cards">` + cards + `</ul>`;
    return markup;
  }

  function showTeam() {

    // const markup = teamCard(our_team_data);
    const markup = createTeam(our_team_data);
    console.log(markup);
    refs.ourTeamModal.innerHTML = markup;
  }
}
export { renderModal };

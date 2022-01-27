const diziSpiner = document.querySelector('.dizzy');
const mainContainer = document.querySelector('.main-container');
export default function spiner() {
  window.addEventListener('load', () => {
    diziSpiner.classList.add('dizzy-gillespie');
    diziSpiner.classList.remove('hide-dizzy');
    setTimeout(() => {
      diziSpiner.remove();
      mainContainer.classList.remove('hide-dizzy');
    }, 900);
  });
}

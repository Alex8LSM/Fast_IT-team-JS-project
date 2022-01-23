
import movieTpl from '../partials/templates/modalMovie.hbs';
import apiMovieId from './apiMovieModal';

const refs = {
      openModalBtn: document.querySelector('.main-container'),
      backdrop: document.querySelector('.js-backdrop'),
        };
        
      refs.openModalBtn.addEventListener('click', onOpenModal);
      refs.backdrop.addEventListener('click', onBackdropClick);
      
async function onOpenModal(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG' && e.target.nodeName !== 'H2' && e.target.nodeName !== 'P') {
   return;
  }

  try { 
    let id = e.target.dataset.id;
    const movie = await apiMovieId.fetchMoviesById(id);
    renderMovie(movie);
  } catch(error){

  }
       }

function renderMovie(movie) { 
    const markup = movieTpl(movie);

    refs.backdrop.innerHTML = markup;
    document.body.classList.add('show-modal');
    window.addEventListener('keydown', onEscKeyPress);

    const closeModalBtn = document.querySelector('[data-action="close-modal"]');
    closeModalBtn.addEventListener('click', onCloseModal);
}
          
function onCloseModal() {
    window.removeEventListener('keydown', onEscKeyPress);
    document.body.classList.remove('show-modal');
      }
      
function onBackdropClick(event) {
    if (event.currentTarget === event.target) {
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



import movieTpl from '../partials/templates/modalMovie.hbs';
import apiMovieId from './apiMovieModal';


const refs = {
      openModalBtn: document.querySelector('.main-container'),
      backdrop: document.querySelector('.js-backdrop'),
      lockScroll: document.querySelector('[data-lockScroll]'),
        };
        
      refs.openModalBtn.addEventListener('click', onOpenModal);
      refs.backdrop.addEventListener('click', onBackdropClick);
      
async function onOpenModal(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG' && e.target.nodeName !== 'H2') {
   return;
  }

  try {
    let id = e.target.dataset.id;
    const movie = await apiMovieId.fetchMoviesById(id);
    renderMovie(movie);
    refs.lockScroll.classList.add('scroll-lock');

    const watchedBtn = document.querySelector('.watched');
    const queueBtn = document.querySelector('.queue');
    const filmID = document.querySelector('.film-id').getAttribute('id');

    if (checkLocal(watchedBtn.name, filmID)) {
      watchedBtn.classList.add('btnActive');
      checkBtnActive(watchedBtn);
    }
    if (checkLocal(queueBtn.name, filmID)) {
      queueBtn.classList.add('btnActive');
      checkBtnActive(queueBtn);
    }
    
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
    refs.lockScroll.classList.remove('scroll-lock');
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

function checkLocal(key, filmId) {
  let localItems = JSON.parse(localStorage.getItem(key));
  if (localItems == null) {
    localItems = [];
    localStorage.setItem(key, JSON.stringify(localItems));
  }
  const isIdExist = localItems.includes(filmId);
  return isIdExist;
}

function checkBtnActive(btn) {
  if (btn.classList.contains('btnActive')) {
    btn.textContent = `Delete from ${btn.name}`;
  } else {
    btn.textContent = `Add to ${btn.name}`;
  }
}
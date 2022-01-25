const filmModal = document.querySelector('.js-backdrop');

filmModal.addEventListener('click', onOpenFilmModal);

function checkBtnActive(btn) {
  if (btn.classList.contains('btnActive')) {
    btn.textContent = `Delete from ${btn.name}`;
  } else {
    btn.textContent = `Add to ${btn.name}`;
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

function addToLocal(key, filmId) {
  let localItems = JSON.parse(localStorage.getItem(key));
  localItems.push(filmId);
  localStorage.setItem(key, JSON.stringify(localItems));
}

function removeFromLocal(key, filmId) {
  let localItems = JSON.parse(localStorage.getItem(key));
  let index = localItems.indexOf(filmId);
  if (index !== -1) {
    localItems.splice(index, 1);
  }
  localStorage.setItem(key, JSON.stringify(localItems));
}

function onOpenFilmModal(e) {
    const filmID = document.querySelector('.film-id').getAttribute('id');

    if (e.target.name == 'watched' || e.target.name == 'queue') {
        const clickedBtn = e.target;
        const clickedBtnName = clickedBtn.name;
      if (checkLocal(clickedBtnName, filmID)) {
        removeFromLocal(clickedBtnName, filmID);
      } else {
        addToLocal(clickedBtnName, filmID);
        }
        
      clickedBtn.classList.toggle('btnActive');
        checkBtnActive(clickedBtn);
    }
}


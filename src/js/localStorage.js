const watchedBtn = document.querySelector('.watched-btn');
const myID = 00002;
watchedBtn.addEventListener('click', checkWatched(myID));

function checkWatched(id) {
//   if (id > 0) {
//     addToWatched(id);
//     watchedBtn.classList.add('inWatchedList');
//     myID = 0;
//   } else {
//     removeFronWatched(id);
//     watchedBtn.classList.remove('inWatchedList');
//     myID = 1;
//   }
    console.log(id);
}

// function addToLocal(key, value) {
//   const localItems = getItem(key);

//   console.log(`${value} - added to ${key}`);
//   localStorage.setItem(key, value);
// }

// function removeFromLocal(key, value) {
//   console.log(`${value} - removed from ${key}`);
//   localStorage.setItem(key, value);
// }

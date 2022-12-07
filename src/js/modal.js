import { addInLocalStorage } from './headerLibrary';
// const cardsListLibrary = document.querySelector('.cards__list--library');
const list = document.querySelector('.cards__list');
const modal = document.querySelector('[data-modal]');
const closeModalBtn = document.querySelector('[data-modal-close]');
const poster = document.querySelector('.poster');
const addInStorageWantWatch = document.querySelector(
  '[data-addInStorageWantWatch]'
);
const addInStorageWatched = document.querySelector(
  '[data-addInStorageWatched]'
);
//данные фильма открытого в модалки
let filmClick = {};

//закрытия модалки по кнопки
closeModalBtn.addEventListener('click', toggleModal);

//открытия и закрытия модалки
function toggleModal() {
  modal.classList.toggle('is-hidden');
  poster.src = filmClick.poster_path;
  addInStorageWantWatch.id = filmClick.id;
  addInStorageWatched.id = filmClick.id;
}

//слушатель списка
list?.addEventListener('click', onClick);
// cardsListLibrary?.addEventListener('click', onClick);

// передача данных
export function onClick(evt) {
  const id = evt.path[1].parentElement.id;
  console.log(id);
  searchId(id);
  toggleModal();
}

// функция поиска данных фильма
function searchId(id) {
  //данные фильмов на странице
  const films = JSON.parse(localStorage.getItem('allFilmOnPage'));

  //    console.log(films)

  films.map(film => {
    if (film.id == id) {
      filmClick = film;
    } else {
      return;
    }
  });
  // фильм
  //   console.log(filmClick)
}

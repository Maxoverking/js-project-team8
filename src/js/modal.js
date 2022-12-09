import { onOpenModal } from './headerLibrary';
import allGenres from './genres.json';

const cardsListLibrary = document.querySelector('.cards__list--library');


const list = document.querySelector('.cards__list');
const modal = document.querySelector('[data-modal]');
const modalMarkup = document.querySelector('.modal__info');
const backdrop = document.querySelector('.backdrop');

const closeModalBtn = document.querySelector('[data-modal-close]');
const poster = document.querySelector('.poster');
// const addInStorageWantWatch = document.querySelector(
//   '[data-addInStorageWantWatch]'
// );
// const addInStorageWatched = document.querySelector(
//   '[data-addInStorageWatched]'
// );
//данные фильма открытого в модалки
let filmClick = {};

//закрытия модалки по кнопки
closeModalBtn.addEventListener('click', toggleModal);

//открытия и закрытия модалки
function toggleModal() {
  modal.classList.toggle('is-hidden');
  document.body.classList.toggle('modal-open');
  window.removeEventListener('keydown', onEscapeClose);
  backdrop.removeEventListener('click', onClickClose);
  // очищаем html модалки(кроме кнопок и кнопки закрытия)
  clearModarMarkup();


}

// console.log("🚀  location.pathname", location.pathname);
//слушатель списка
if (cardsListLibrary === null) {
  list.addEventListener('click', onClick);
} else {
  cardsListLibrary.addEventListener('click', onClick);
}
// cardsListLibrary === null
// location.pathname === '/library.html'
// передача данных
export function onClick(evt) {
  filmClick = {};
  const id = evt.path[1].parentElement.id;
  searchId(id);

  if (Object.keys(filmClick).length === 0) {
    return
  } else {
    toggleModal();
    // рисуем разметку модалки при открытии


    createModaMarckup(filmClick);
    onOpenModal(filmClick.id);
    window.addEventListener('keydown', onEscapeClose);
    backdrop.addEventListener('click', onClickClose);
  }



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

function createModaMarckup(obj) {
  const {
    poster_path,
    title,
    vote_average,
    vote_count,
    popularity,
    genre_ids,
    overview,
    id,
  } = obj;
  const rate = vote_average.toFixed(1).toString();
  const markup = `
<div class="modal-container">

        <div class="modal-poster">
          <img
            src="${poster_path}"
            class="poster" alt="poster" id="poster">
        </div>
        
        <div class="film-info">

          <div class="film-info__about">
            <h2 class="modal__title" id="modalTitle">${title}</h2>
            <table class="modal-table">
                <tr class="modal-table__row">
                  <td class="modal-table__title">Vote/Votes</td>
                  <td class="backslash row"> <span class="rate">${rate}</span> / <span class="vote-count">${vote_count}</span></td>
                </tr>
                <tr class="modal-table__row">
                  <td class="modal-table__title">Popularity</td>
                  <td class="modal-table__info">${popularity}</td>
                </tr>
                <tr class="modal-table__row">
                  <td class="modal-table__title">Original Title</td>
                  <td class="modal-table__info uppercase">${title}</td>
                </tr>
                <tr class="modal-table__row">
                  <td class="modal-table__title">Genre</td>
                  <td class="modal-table__info">${findGenresOfMovie(genre_ids)}</td>
                </tr>
            </table>
            <h3 class="modal-about">about</h3>
            <p class="modal-about__text" id="aboutMovie">${overview}</p>
          </div>
          
            <div class="buttons">
              <button type="button" name="" class="addInStorageWantWatch" data-addInStorageWatched id="${id}">
                add to Watched
              </button>
              <button type="button" name="" class="addInStorageAlreadyWatched" data-addInStorageWantWatch id="${id}">
                add to queue
              </button>
            </div>

        </div>


</div>`;

  // modalMarkup.innerHTML += markup;

  modalMarkup.insertAdjacentHTML('afterbegin', markup);


}




function clearModarMarkup() {
  modalMarkup.innerHTML = '';

}

const { genres } = allGenres;
function findGenresOfMovie(ids) {
  const arr = ids.flatMap(id => genres.filter(element => element.id === id));
  let movieGenres = arr.map(el => el.name);
  if (movieGenres.length > 2) {
    const removedGenres = movieGenres.splice(0, 2);
    removedGenres.push('Other');

    return removedGenres.join(', ');
  }
  if (movieGenres.length === 0) {
    return (movieGenres = 'Not found');
  }
  return movieGenres.join(', ');
}

function onEscapeClose(e) {
  if (e.code === 'Escape') {
    modal.classList.toggle('is-hidden');
    document.body.classList.toggle('modal-open');
    // addInStorageWantWatch.id = filmClick.id;
    // addInStorageWatched.id = filmClick.id;
    clearModarMarkup();
    window.removeEventListener('keydown', onEscapeClose);
    backdrop.removeEventListener('click', onClickClose);
  }
}

function onClickClose(e) {
  if (e.target.classList.value !== 'backdrop') {
    return;
  }
  modal.classList.toggle('is-hidden');
  document.body.classList.toggle('modal-open');
  // addInStorageWantWatch.id = filmClick.id;
  // addInStorageWatched.id = filmClick.id;
  clearModarMarkup();
  window.removeEventListener('keydown', onEscapeClose);
  backdrop.removeEventListener('click', onClickClose);
}

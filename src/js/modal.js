import { addInLocalStorage } from './headerLibrary';
import allGenres from './genres.json';



const cardsListLibrary = document.querySelector('.cards__list--library');


const list = document.querySelector('.cards__list');
const modal = document.querySelector('[data-modal]');
const modalMarkup = document.querySelector('.modal__info');
const backdrop = document.querySelector('.backdrop');

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
  document.body.classList.toggle("modal-open");
  addInStorageWantWatch.id = filmClick.id;
  addInStorageWatched.id = filmClick.id;
  window.removeEventListener("keydown", onEscapeClose);
  backdrop.removeEventListener("click", onClickClose);
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
  const id = evt.path[1].parentElement.id;
  console.log(id);
  searchId(id);
  toggleModal();

  // рисуем разметку модалки при открытии
  console.log(filmClick);
  createModaMarckup(filmClick);
  window.addEventListener("keydown", onEscapeClose);
  backdrop.addEventListener("click", onClickClose);
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
};


function createModaMarckup(obj) {
  const { poster_path, title, vote_average, vote_count, popularity, genre_ids, overview } = obj;
  const rate = vote_average.toFixed(1).toString();
  const markup = `<div class="modal-container">
        <div class="modal-poster">
          <img
            src="${poster_path}"
            class="poster" alt="poster" id="poster">
        </div>
        <div class="film-info">
          <h2 class="modal__title" id="modalTitle">${title}</h2>
          <div class="modal-data">
            <table class="modal-data-table">
              <tbody>
                <tr>
                  <td class="modal__characteristic-rating"><span class="modal__characteristic-rating--text">Vote /
                      Votes</span> </td>
                  <td class="modal__characteristic-rating"> <span class="modal__characteristic-inform--accent"
                      id="averageRating">${rate}</span> /
                    <span class="modal__characteristic-inform" id="rating">${vote_count}</span>
                  </td>
                </tr>
                <tr>
                  <td class="modal__characteristic-popularity"><span
                      class="modal__characteristic-popularity--text">Popularity</span></td>
                  <td class="modal__characteristic-popularity"> <span class="modal__characteristic-inform"
                      id="popularity">${popularity}</span> </td>
                </tr>
                <tr>
                  <td class="modal__characteristic-title"><span class="modal__characteristic-title--text">Original
                      Title</span></td>
                  <td class="modal__characteristic-title"> <span class="block-style modal__characteristic-inform"
                      id="title">${title}</span>
                  </td>
                </tr>
                <tr>
                  <td class="modal__characteristic-genre"><span class="modal__characteristic-genre--text">Genre</span>
                  </td>
                  <td class="modal__characteristic-genre">${findGenresOfMovie(genre_ids)} <span class="block-style modal__characteristic-inform"
                      id="genre"></span> </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3 class="modal__about">ABOUT</h3>
          <p class="modal__about-text" id="aboutMovie">${overview}</p>
    </div>`;

  // modalMarkup.innerHTML += markup;

  modalMarkup.insertAdjacentHTML("afterbegin", markup);

};

function clearModarMarkup() {
  modalMarkup.innerHTML = ''
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
    return movieGenres = 'Not found';
  }
  return movieGenres.join(', ');
}

function onEscapeClose(e) {
  if (e.code === "Escape") {
    modal.classList.toggle('is-hidden');
    document.body.classList.toggle("modal-open");
    addInStorageWantWatch.id = filmClick.id;
    addInStorageWatched.id = filmClick.id;
    clearModarMarkup();
    window.removeEventListener("keydown", onEscapeClose);
    backdrop.removeEventListener("click", onClickClose);
  }
}

function onClickClose(e) {
  if (e.target.classList.value !== 'backdrop') {
    return
  }
  modal.classList.toggle('is-hidden');
  document.body.classList.toggle("modal-open");
  addInStorageWantWatch.id = filmClick.id;
  addInStorageWatched.id = filmClick.id;
  clearModarMarkup();
  window.removeEventListener("keydown", onEscapeClose);
  backdrop.removeEventListener("click", onClickClose);
}
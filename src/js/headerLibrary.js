import createCardLibrary from './filmCardsLibrary.js';

const refs = {
  body: document.querySelector('body'),
};
export function forLocalStorageClick() {}
refs.body.addEventListener('click', onClickButton);

function onClickButton(e) {
  if (e.target.hasAttribute('data-addInStorageWantWatch')) {
    addInQueuehList(e);
  }

  if (e.target.hasAttribute('data-addinstoragewatched')) {
    addInWatchedList(e);
  }

  if (e.target.hasAttribute('data-render-watched')) {
    addInLibraryWatched();
  }
  if (e.target.hasAttribute('data-render-queue')) {
    addInLibraryQueue();
  }
}

function addInQueuehList(e) {
  let filmListWatched =
    JSON.parse(localStorage.getItem('filmListWatched')) || [];
  // берем ранее сохраненне фильмы из локстор если есть
  let filmListWantWatch =
    JSON.parse(localStorage.getItem('filmListWantWatch')) || [];
  // берем с локалсторедж все фильмы пришедшие с бекенда на страницу если есть
  let filmOnPage = JSON.parse(localStorage.getItem('allFilmOnPage')) || [];
  // определение где кликнули
  let wantWatch = +e.srcElement.id;
  // находим совпадение в пришедшем с бекенда и тем фильмом по котрому кликнули
  // и записываем в переменную
  let filmIdForBaseWantWatch = filmOnPage.find(film => {
    return film.id === wantWatch;
  });

  //сравниваем то что есть в базе "хочу посмотреть" с тем по которому нажали
  let doubleFilm = [];
  doubleFilm = filmListWantWatch.find(film => {
    return film.id === filmIdForBaseWantWatch.id;
  });

  //если совпадение нет, то запушить в массив, иначе удалить из массива
  if (doubleFilm === undefined) {
    filmListWantWatch.push(filmIdForBaseWantWatch);
    refs.body
      .querySelector('[data-addInStorageWantWatch]')
      .classList.add('action-library');
    refs.body.querySelector('[data-addInStorageWantWatch]').innerHTML =
      'del from Queue';
  } else {
    filmListWantWatch.forEach((film, index) => {
      if (film.id === doubleFilm.id) {
        filmListWantWatch.splice(index, 1);

        refs.body.querySelector('[data-addInStorageWantWatch]').innerHTML =
          'add to queue';
        refs.body
          .querySelector('[data-addInStorageWantWatch]')
          .classList.remove('action-library');
      }
    });
  }
  //залить в локал сторадж

  localStorage.setItem('filmListWantWatch', JSON.stringify(filmListWantWatch));

  deleteFromLibrary(
    filmListWatched,
    wantWatch,
    'filmListWatched',
    '[data-addinstoragewatched]',
    'add to queue'
  );
}
function addInWatchedList(e) {
  let filmListWantWatch =
    JSON.parse(localStorage.getItem('filmListWantWatch')) || [];
  // берем ранее сохраненне фильмы из локстор если есть
  let filmListWatched =
    JSON.parse(localStorage.getItem('filmListWatched')) || [];
  // берем с локалсторедж все фильмы пришедшие с бекенда на страницу если есть
  let filmOnPage = JSON.parse(localStorage.getItem('allFilmOnPage')) || [];
  // определение где кликнули
  let watched = +e.srcElement.id;
  // находим совпадение в пришедшем с бекенда и тем фильмом по котрому кликнули
  // и записываем в переменную
  let filmIdForBaseWatched = filmOnPage.find(film => {
    return film.id === watched;
  });
  // doubleFilmDelete(filmListWatched, filmOnPage, filmIdForBaseWatched);
  //сравниваем то что есть в базе "хочу посмотреть" с тем по которому нажали
  let doubleFilm = [];
  doubleFilm = filmListWatched.find(film => {
    return film.id === filmIdForBaseWatched.id;
  });

  // //если совпадение нет, то запушить в массив, иначе удалить из массива
  if (doubleFilm === undefined) {
    filmListWatched.push(filmIdForBaseWatched);
    refs.body
      .querySelector('[data-addinstoragewatched]')
      .classList.toggle('action-library');
    refs.body.querySelector('[data-addinstoragewatched]').innerHTML =
      'del from Watched';
  } else {
    filmListWatched.forEach((film, index) => {
      if (film.id === doubleFilm.id) {
        filmListWatched.splice(index, 1);
        refs.body.querySelector('[data-addinstoragewatched]').innerHTML =
          'add to Watched';
        refs.body
          .querySelector('[data-addinstoragewatched]')
          .classList.remove('action-library');
      }
    });
  }

  //залить в локал сторадж
  localStorage.setItem('filmListWatched', JSON.stringify(filmListWatched));

  deleteFromLibrary(
    filmListWantWatch,
    watched,
    'filmListWantWatch',
    '[data-addInStorageWantWatch]',
    'add to Watched'
  );
}

// рендер фильмов в библиотеке "watched"
function addInLibraryWatched() {
  refs.body
    .querySelector('[data-render-watched]')
    .classList.add('action-library');
  refs.body
    .querySelector('[data-render-queue]')
    .classList.remove('action-library');
  const rerender = refs.body.querySelector('.cards__list--library');
  rerender.innerHTML = '';
  let filmListWatched =
    JSON.parse(localStorage.getItem('filmListWatched')) || [];
  createCardLibrary(filmListWatched);
}
// рендер фильмов в библиотеке "queue"
function addInLibraryQueue() {
  refs.body
    .querySelector('[data-render-watched]')
    .classList.remove('action-library');
  refs.body
    .querySelector('[data-render-queue]')
    .classList.add('action-library');
  const rerender = refs.body.querySelector('.cards__list--library');
  rerender.innerHTML = '';
  let filmListWantWatch =
    JSON.parse(localStorage.getItem('filmListWantWatch')) || [];
  createCardLibrary(filmListWantWatch);
}
// проверка филма в библиотек при открытии модального окна
export function onOpenModal(id) {

  // const addInStorageWantWatch = document.querySelector(
  //   '[data-addInStorageWantWatch]'
  // );
  // const addInStorageWatched = document.querySelector(
  //   '[data-addInStorageWatched]'
  // );
  // addInStorageWantWatch.id = filmClick.id;
  // addInStorageWatched.id = filmClick.id;

  refs.body
    .querySelector('[data-addInStorageWantWatch]')
    .classList.remove('action-library');
  refs.body
    .querySelector('[data-addinstoragewatched]')
    .classList.remove('action-library');

  const filmListWatched =
    JSON.parse(localStorage.getItem('filmListWatched')) || [];
  const filmListWantWatch =
    JSON.parse(localStorage.getItem('filmListWantWatch')) || [];
  if (filmListWatched.find(item => item.id == id)) {
    refs.body
      .querySelector('[data-addinstoragewatched]')
      .classList.add('action-library');
    refs.body.querySelector('[data-addinstoragewatched]').innerHTML =
      'del from Watched';
    return;
  }
  if (filmListWantWatch.find(item => item.id == id)) {
    refs.body
      .querySelector('[data-addInStorageWantWatch]')
      .classList.add('action-library');
    refs.body.querySelector('[data-addInStorageWantWatch]').innerHTML =
      'del from Queue';
    return;
  }
}

function deleteFromLibrary(library, id, libraryName, selectorName, buttonName) {
  library.forEach((film, index) => {
    if (film.id === id) {
      library.splice(index, 1);
      localStorage.setItem(libraryName, JSON.stringify(library));
      refs.body.querySelector(selectorName).classList.remove('action-library');
      refs.body.querySelector(selectorName).innerHTML = buttonName;
    }
  });
}
// начальный рендер библиотеки
if (refs.body.querySelector('[data-render-watched]')) {
  addInLibraryWatched();
}

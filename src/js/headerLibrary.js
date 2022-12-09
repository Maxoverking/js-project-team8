import createCardLibrary from './filmCardsLibrary.js';

const refs = {
  body: document.querySelector('body'),
};
export function forLocalStorageClick() {}
refs.body.addEventListener('click', onClickButton);

function onClickButton(e) {
  if (e.target.hasAttribute('data-addInStorageWantWatch')) {
    addInWantWatchList(e);
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

function addInWantWatchList(e) {
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
  console.log('🚀 ~ filmIdForBaseWantWatch', filmIdForBaseWantWatch);
  //сравниваем то что есть в базе "хочу посмотреть" с тем по которому нажали
  let doubleFilm = [];
  doubleFilm = filmListWantWatch.find(film => {
    return film.id === filmIdForBaseWantWatch.id;
  });

  //если совпадение нет, то запушить в массив, иначе удалить из массива
  if (doubleFilm === undefined) {
    filmListWantWatch.push(filmIdForBaseWantWatch);
  } else {
    filmListWantWatch.forEach((film, index) => {
      if (film.id === doubleFilm.id) {
        filmListWantWatch.splice(index, 1);
      }
    });
  }
  //залить в локал сторадж
  localStorage.setItem('filmListWantWatch', JSON.stringify(filmListWantWatch));
}
function addInWatchedList(e) {
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
  } else {
    filmListWatched.forEach((film, index) => {
      if (film.id === doubleFilm.id) {
        filmListWatched.splice(index, 1);
      }
    });
  }

  //залить в локал сторадж
  localStorage.setItem('filmListWatched', JSON.stringify(filmListWatched));
}

// рендер фильмов в библиотеке "watched"
function addInLibraryWatched() {
  refs.body
    .querySelector('[data-render-watched]')
    .classList.add('action-liblary');
  refs.body
    .querySelector('[data-render-queue]')
    .classList.remove('action-liblary');
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
    .classList.remove('action-liblary');
  refs.body
    .querySelector('[data-render-queue]')
    .classList.add('action-liblary');
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
    .classList.remove('action-liblary');
  refs.body
    .querySelector('[data-addinstoragewatched]')
    .classList.remove('action-liblary');

  const filmListWatched =
    JSON.parse(localStorage.getItem('filmListWatched')) || [];
  const filmListWantWatch =
    JSON.parse(localStorage.getItem('filmListWantWatch')) || [];
  if (filmListWatched.find(item => item.id == id)) {
    refs.body
      .querySelector('[data-addinstoragewatched]')
      .classList.add('action-liblary');

    return;
  }
  if (filmListWantWatch.find(item => item.id == id)) {
    refs.body
      .querySelector('[data-addInStorageWantWatch]')
      .classList.add('action-liblary');
    return;
  }
}
// удаление задвоения в библиотеках
// function doubleFilmDelete(filmListWatched, filmOnPage, filmIdForBaseWatched) {
//   // находим совпадение в пришедшем с бекенда и тем фильмом по котрому кликнули
//   // и записываем в переменную
//   let filmIdForBaseWatched = filmOnPage.find(film => {
//     return film.id === watched;
//   });
//   //сравниваем то что есть в базе "хочу посмотреть" с тем по которому нажали
//   let doubleFilm = [];
//   doubleFilm = filmListWatched.find(film => {
//     return film.id === filmIdForBaseWatched.id;
//   });

//   //если совпадение нет, то запушить в массив, иначе удалить из массива
//   if (doubleFilm === undefined) {
//     filmListWatched.push(filmIdForBaseWatched);
//   } else {
//     filmListWatched.forEach((film, index) => {
//       if (film.id === doubleFilm.id) {
//         filmListWatched.splice(index, 1);
//       }
//     });
//   }
// }
if (refs.body.querySelector('[data-render-watched]')) {
  addInLibraryWatched();
}

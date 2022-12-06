import createCard from './filmCards-home.js';

const refs = {
  body: document.querySelector('body'),
};
refs.body.addEventListener('click', onClickButton);

function onClickButton(e) {
  if (e.target.hasAttribute('data-addinstoragewatched')) {
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

  //сравниваем то что есть в базе "хочу посмотреть" с тем по которому нажали
  let doubleFilm = [];
  doubleFilm = filmListWatched.find(film => {
    return film.id === filmIdForBaseWatched.id;
  });

  //если совпадение нет, то запушить в массив, иначе удалить из массива
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
function addInLibraryWatched() {
  let filmListWatched =
    JSON.parse(localStorage.getItem('filmListWatched')) || [];
  createCard(filmListWatched);
}
function addInLibraryQueue() {
  let filmListWantWatch =
    JSON.parse(localStorage.getItem('filmListWantWatch')) || [];
  createCard(filmListWantWatch);
}

import { createCard } from './filmCardsHome.js';
// в строчке 3 загототовка для экспорта функции и получения данных из вне
// export function addInLocalStorage(data = {}) {

// сюда приходят данные с бекенда со всеми данными после рендера страницы расскомментировать
// запиывает в локалсторедж все фильмы пришедшие с бекенда на страницу
// localStorage.setItem('allFilmOnPage', JSON.stringify(filmList));
// ----------------------------------------------------------------------
const refs = {
  body: document.querySelector('body'),
};

refs.body.addEventListener('click', OnClick);

function OnClick(e) {
  if (e.srcElement.className === 'addInStorageWantWatch') {
    addInWantWatchList(e);
  }
  if (e.srcElement.className === 'addInStorageAlreadyWatched') {
    addInWatched(e);
  }
}

function addInWantWatchList(e) {
  // 27 строчка подходит для рендера страниц хочу посмотреть и посмотрел
  // берем ранее сохраненне фильмы из локстор если есть
  let filmListWantWatch =
    JSON.parse(localStorage.getItem('filmListWantWatch')) || [];
  // берем с локалсторедж все фильмы пришедшие с бекенда на страницу если есть
  let filmOnPage = JSON.parse(localStorage.getItem('allFilmOnPage')) || [];
  // определение где кликнули
  let wantWatch = +e.path[1].firstChild.parentElement.id;
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

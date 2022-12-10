import allGenres from './genres.json';
import { paginationLibrary } from './pagination-library';
import { addRemDataToLocalstorage } from './filmCards-home';

const cardsListLibrary = document.querySelector('.cards__list--library');
const notFilmlibrary = document.querySelector('#library');

//Функция создания карточки на странице Home
export default function createCardLibrary(data) {
  if (data.length > 20) data = data.slice(0, 20);

  const markup = data
    .map(obj => {
      const { id, poster_path, title, release_date, genre_ids, vote_average } =
        obj;
      const rate = vote_average.toFixed(1).toString();
      // console.log(obj);
      return `<li class="cards__item" id="${id}" >
        <a class="cards__link">
            <img class="cards__img" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}" loading="lazy">
        </a>
        <div class="cards__text">
        <h2 class="cards__name">${title}</h2>
        <p class="cards__genres"> ${findGenresOfMovie(
          genre_ids
        )}  | ${createYear(release_date)}
        <span class="cards__rating">${rate}</span></p></div>

    </li>`;
    })
    .join('');

  // console.log(markup);
  if (cardsListLibrary) {
    cardsListLibrary.innerHTML = markup;
  }
  // if (cardsListLibrary.firstChild === null) {
  //   notFilmlibrary.classList.remove('visually-hidden');
  // }
  
}

//Функция для отображения года выпуска
function createYear(data) {
  if (data) {
    return data.slice(0, 4);
  } else {
    return (data = 'Not found');
  }
}
//Функция которая отвечает за жанр
const { genres } = allGenres;
export function findGenresOfMovie(ids) {
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

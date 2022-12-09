import Notiflix from 'notiflix';
import FetchData from './FetchData.js';
import {
  createCard,
  insertMarkup,
  addRemDataToLocalstorage,
} from './filmCards-home.js';
import {pagination} from './pagination.js';

const cardsList = document.querySelector('.cards__list');
const movieGalleryFetch = new FetchData();
const form = document.querySelector('.search-form');
const input = document.getElementById('inputSearch');
const message = document.querySelector('.error-search');

form.addEventListener('submit', e => {
  e.preventDefault();
  Notiflix.Loading.dots({
    clickToClose: false,
    svgSize: '100px',
  });
  const word = input.value; // e.currentTarget.input выдает ошибку
  // console.log(word) // слово для поиска
  movieGalleryFetch
    .getSearchData(word)
    .then(response => {
      console.log('даные которые пришли в search', response);
      if (response.data.length == 0) {
        message.classList.add('visible');
        Notiflix.Loading.remove(500);
        setTimeout(() => message.classList.remove('visible'), 4000);
      } else {
              insertMarkup(createCard(response.data), cardsList);
              addRemDataToLocalstorage(response.data);
        Notiflix.Loading.remove(500);
        pagination(response);
      }
    })
    .catch(err => {
      console.log('index err');
      console.log(err);
    });
});

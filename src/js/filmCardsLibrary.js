import FetchData from './FetchData.js';
import createCard from './filmCards-home.js';
import { onClick } from './modal.js';

const cardsListLibrary = document.querySelector('.cards__list--library');


//Функция создания карточки на странице Home
export default function createCardLibrary(data){
    const markup = data.map(obj => {
        const {id, poster_path, title, release_date, genre_ids} = obj;
        // console.log(obj);
    return `<li class="cards__item" id="${id}">
        <a class="cards__link">
            <img class="cards__img" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}" loading="lazy">
        </a>
        <h2 class="cards__name">${title}</h2>
        <p class="cards__genres"> ${genre_ids} | ${createYear(release_date)}</p>
    </li>`
    }).join("");

    console.log(markup);
    cardsListLibrary.innerHTML =  markup;
    cardsListLibrary.addEventListener('click', onClick)
}

//Функция для отображения года выпуска
function createYear(data) { 
    if(data) {
        return data.slice(0, 4);
    } else {
        return data = 'Not found';
    }
}
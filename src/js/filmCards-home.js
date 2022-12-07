import allGenres from './genres.json';
import FetchData from './FetchData.js';
import pagination from './pagination';

const cardsList = document.querySelector('.cards__list');
const movieGalleryFetch = new FetchData();

// Получаем данные
  movieGalleryFetch
    .getTrendingData(1)
    .then(response => {
       console.log('даные которые пришли',response.data);
        createCard(response.data)
        pagination(response);
    })
    .catch(err => {
        console.log('index err');
        console.log(err.message);
    });

//Функция создания карточки на странице Home
export default function createCard(data) {
    const markup = data.map(obj => {
        const { id, poster_path, title, release_date, genre_ids } = obj;
        // console.log(obj);
        return `<li class="cards__item" id="${id}">
        <a class="cards__link">
            <img class="cards__img" src="https://image.tmdb.org/t/p/w400${poster_path}" alt="${title}" loading="lazy">
        </a>
            <div class="cards__text"><h2 class="cards__name">${getShortName(title)}</h2>
            <p class="cards__genres"> ${findGenresOfMovie(genre_ids)} | ${createYear(release_date)}</p>
            </div>
        </li>`
    }).join("");
    // console.log(markup);
    //cardsList.insertAdjacentHTML("beforeend", markup);
    cardsList.innerHTML=markup;
    

    //удаления и сохранения локал сторедж 
    localStorage.removeItem('allFilmOnPage');
    let allFilms = JSON.stringify(data);
    localStorage.setItem('allFilmOnPage', allFilms);

    
}

//Функция для отображения года выпуска
function createYear(data) {
    if (data) {
        return data.slice(0, 4);
    } else {
        return data = 'Not found';
    }
}

//Функция которая обрезает название
function getShortName(string) {
    if (string) {
        if (string.length >= 32) {
            return string.substr(0, 32) + '...';
        }
        return string;
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
        return movieGenres = 'Not found';
    }
    return movieGenres.join(', ');
}


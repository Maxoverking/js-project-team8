import allGenres from './genres.json';
import FetchData from './FetchData.js';
const movieGalleryFetch = new FetchData();

let currentPage = 1;
// Получаем данные

const wait = async () => {
    const first = await movieGalleryFetch.getTrendingData(currentPage);
    return first;
};


wait()
    .then(res => {
        const data = res.data
        createCard(data)
    })
    .catch(err => {
        console.log('index err');
        console.log(err.message);
    });


// movieGalleryFetch
//     .getTrendingData(currentPage)
//     .then(res => {
//         const data = res.data
//         createCard(data)
//     }).catch(err => {
//         console.log('index err');
//         console.log(err.message);
//     });

const cardsList = document.querySelector('.cards__list');

//Функция создания карточки на странице Home
export function createCard(data) {
    // console.log("🚀  data", data);
    const dataArray = data.results;
    // console.log(dataArray);
    const markup = dataArray.map(obj => {
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
    cardsList.insertAdjacentHTML("beforeend", markup);

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
    const movieGenres = arr.map(el => el.name);
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
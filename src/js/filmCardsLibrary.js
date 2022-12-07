import allGenres from './genres.json';

const cardsListLibrary = document.querySelector('.cards__list--library');

//Функция создания карточки на странице Home
export default function createCardLibrary(data){
    const markup = data.map(obj => {
        const {id, poster_path, title, release_date, genre_ids} = obj;
        // console.log(obj);
    return `<li class="cards__item" id="${id}" >
        <a class="cards__link">
            <img class="cards__img" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}" loading="lazy">
        </a>
        <h2 class="cards__name">${title}</h2>
        <p class="cards__genres"> ${findGenresOfMovie(genre_ids)}  | ${createYear(release_date)}</p>
    </li>`
    }).join("");

    // console.log(markup);
    if (location.pathname === '/library.html') {
cardsListLibrary.innerHTML =  markup;
}
}

//Функция для отображения года выпуска
function createYear(data) { 
    if(data) {
        return data.slice(0, 4);
    } else {
        return data = 'Not found';
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
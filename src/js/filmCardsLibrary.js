import FetchData from './FetchData.js';


const cardsListLibrary = document.querySelector('.cards__list--library');


// //Функция создания карточки на странице Home
// export function createCard(data){
//     const dataArray = data.results;
//     console.log(dataArray);
//     const markup = dataArray.map(obj => {
//         const {id, poster_path, title, release_date, genre_ids} = obj;
//         // console.log(obj);
//     return `<li class="cards__item" id="${id}">
//         <a class="cards__link">
//             <img class="cards__img" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}" loading="lazy">
//         </a>
//         <h2 class="cards__name">${title}</h2>
//         <p class="cards__genres"> ${genre_ids} | ${createYear(release_date)}</p>
//     </li>`
//     }).join("");

//     // console.log(markup);
//     cardsListLibrary.insertAdjacentHTML("beforeend", markup);
    
// }

// //Функция для отображения года выпуска
// function createYear(data) { 
//     if(data) {
//         return data.slice(0, 4);
//     } else {
//         return data = 'Not found';
//     }
// }
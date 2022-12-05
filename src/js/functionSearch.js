import FetchData from './FetchData.js';
import createCard from './filmCards-home.js';
const cardsList = document.querySelector('.cards__list');
const movieGalleryFetch = new FetchData();
const form = document.querySelector('.search-form');
const input = document.getElementById("inputSearch");
const message = document.querySelector(".error-search");

form.addEventListener("submit", (e)=> {
    e.preventDefault();
    const word = input.value; // e.currentTarget.input выдает ошибку
    // console.log(word) // слово для поиска 
    movieGalleryFetch
    .getSearchData(word)
    .then(response => {
       console.log('даные которые пришли',response.data);
       if(response.data.length == 0) {
        message.classList.add("visible");
        setTimeout(()=> message.classList.remove("visible"), 4000)
       }
       else {
        cardsList.innerHTML = ""
        createCard(response.data)
       }
        
    })
    .catch(err => {
        console.log('index err');
        console.log(err);
    });
    
})


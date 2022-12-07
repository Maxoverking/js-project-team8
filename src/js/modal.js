const list = document.querySelector('.cards__list');
const modal = document.querySelector("[data-modal]");
const closeModalBtn = document.querySelector("[data-modal-close]");
const poster = document.querySelector('.poster');
//данные фильма открытого в модалки
let filmClick = {};

//закрытия модалки по кнопки
closeModalBtn.addEventListener("click", toggleModal);

//открытия и закрытия модалки
function toggleModal() {
    modal.classList.toggle("is-hidden");
    poster.src = filmClick.poster_path;
}


//слушатель списка
list.addEventListener('click', onClick)


// передача данных
function onClick(evt) {
    const id = evt.path[1].parentElement.id;
    console.log(id);
    searchId(id)
    toggleModal()

}



// функция поиска данных фильма 
function searchId(id) {
    //данные фильмов на странице
   const films = JSON.parse(localStorage.getItem('allFilmOnPage'));

//    console.log(films)
   
   films.map(film => {
    if(film.id == id) {
        filmClick = film;
    }
    else {
        return;
    }
   })
// фильм 
//   console.log(filmClick)
}
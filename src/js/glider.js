import Glide from '@glidejs/glide';
import FetchData from './FetchData.js';
const sliderContainer = document.querySelector('.js-slider-container');

const cardsListLibrary = document.querySelector('.cards__list--library');
const movieGalleryFetch = new FetchData();
// Получаем данные
if (cardsListLibrary !== null) {
    return;
} else {
    movieGalleryFetch
    .getTrendingData(1)
    .then(response => {
       console.log('даные которые пришли glider',response.data);
      gliderRenderFilms(response.data)
    })
    .catch(err => {
        console.log('index err');
        console.log(err.message);
    });  
}
const glide = new Glide('.glide', {
  type: 'slider',
  startAt: 0,
  perView: 11,
  autoplay: 3000,
  hoverpause: true,
  bound: true,
});
glide.mount()
function gliderRenderFilms(data) {

   console.log("🚀  data в пдшвук", data);
   const markupGlider = data.map(obj => {
        const { id, name, title, vote_average, backdrop_path
       , original_title } = obj;
     const rate = vote_average.toFixed(1).toString();
        return ` <li class="glider-card" data-action='${id}'>
    <div class="gli-title-name">
      <p class="glider-original_title" data-id='${id}'>${original_title}</p>
      <div class="thumb">
      <span class="cards__rating">${rate}</span>
        <img class="glider-image"
      src="https://image.tmdb.org/t/p/w300${backdrop_path}" 
      alt="${title} ${name}"/>
    </div>
    </div>
</li>`}).join("");
  sliderContainer.innerHTML = markupGlider;
}
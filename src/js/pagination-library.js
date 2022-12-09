import createCardLibrary from './filmCardsLibrary';
import { addRemDataToLocalstorage } from './filmCards-home';
import {
  onArrowClick,
  getArrPageNumbersForView,
  paginationMarkup,
} from './pagination';

let search = null;
let total_pages = null;
const cardsOnPageQuantity = 20;
let fetchObj = {};

const dataNormalize = data => {

  console.log('dataNormalize');
  console.log(data.length);
  total_pages =
    data.length > 1 ? Math.ceil(data.length / cardsOnPageQuantity) : 1;
  console.log('dataNormalize Math.ceil(data.length / cardsOnPageQuantity)');
  console.log(total_pages);

  return { page: 1, total_pages, data };


};

const fetchPage = pageNum => {
  fetchObj.page = pageNum;
  const data=[...fetchObj.data].slice(
      (pageNum - 1) * cardsOnPageQuantity,
      pageNum * cardsOnPageQuantity
    )

  
  return {
    ...fetchObj,
    data,
  };
};

const markupUpdate = obj => {
  console.log('markupUpdate');
  console.log(obj.data);
  createCardLibrary(obj.data);

  paginationLibrary(fetchObj);
};

const onPaginationItemClick = async evt => {
  evt.preventDefault();
  let pageNum = null;
  const currentPage = parseInt(document.querySelector('.current').textContent);
  const paginButtonContent = evt.target.textContent;
  if (!(pageNum = parseInt(paginButtonContent))) pageNum = 1;
  if (paginButtonContent === '...') return;
  if (evt.target.closest('.arrow')) pageNum = onArrowClick(evt, currentPage);


  const data = await fetchPage(pageNum);
  addRemDataToLocalstorage(data.data);
  markupUpdate(data);
  //window.scrollTo(0, 0);
};

function paginationLibrary(fetchData) {

  console.log('paginationLibrary');


  if (Array.isArray(fetchData)) {
    fetchObj = dataNormalize(fetchData);
  }

  const paginationEl = document.querySelector('#pagination-list');
  console.log('paginationLibrary');



  paginationEl.innerHTML = paginationMarkup(
    getArrPageNumbersForView(fetchObj.page, fetchObj.total_pages),
    fetchObj.page
  );

  paginationEl.addEventListener('click', onPaginationItemClick);
}

export { paginationLibrary };

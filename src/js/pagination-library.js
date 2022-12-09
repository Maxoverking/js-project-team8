import allGenres from './genres.json';

import createCardLibrary from './filmCardsLibrary';
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
  total_pages = data.length<1 ? data.length / cardsOnPageQuantity : 1;
  return { page: 1, total_pages, data };
};

const fetchPage = pageNum => {
  fetchObj.page = pageNum;
  const data = [...fetchObj.data].slice(
    (pageNum - 1) * cardsOnPageQuantity,
    pageNum * cardsOnPageQuantity
  );

  return {
    ...fetchObj,
    data,
  };
};

const markupUpdate = obj => {
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
  if (evt.target.closest('.arrow')) {
    pageNum = onArrowClick(evt, currentPage, total_pages);
  }

  const data = await fetchPage(pageNum);
  markupUpdate(data);
  //window.scrollTo(0, 0);
};

function paginationLibrary(fetchData) {
  if (Array.isArray(fetchData)) {
    fetchObj = dataNormalize(fetchData);
  }
  total_pages = fetchObj.total_pages;

  const paginationEl = document.querySelector('#pagination-list');

  paginationEl.innerHTML = paginationMarkup(
    getArrPageNumbersForView(fetchObj.page, fetchObj.total_pages),
    fetchObj.page
  );

  paginationEl.addEventListener('click', onPaginationItemClick);
}

export { paginationLibrary };

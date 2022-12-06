import FetchData from './FetchData';
import createCard from './filmCards-home';
import svgArrows from '../images/sprite.svg';

const movieGalleryFetch = new FetchData();

let search = null;
let total_pages = null;

const paginationMarkup = (arr = [], page = 1) => {
  const currentPage = (arrItem, page) => (arrItem === page ? 'current' : '');

  return [
    `<li class="pagination-list__item">
    <button class="pagination-list__button arrow" data-left_one_page>
        <svg>
            <use href="${svgArrows}#icon-arrow-left"></use>
        </svg>
    </button></li>`,
    ...arr.map(
      item =>
        `<li class="pagination-list__item"><button 
        class="pagination-list__button
         ${currentPage(item, page)}">${item}</button></li>`
    ),
    `<li class="pagination-list__item">
    <button 
    class="pagination-list__button arrow" 
    data-right_one_page>
     <svg>
            <use href="${svgArrows}#icon-arrow-right"></use>
        </svg>
    </button>
    </li>`,
  ].join('');
};

const getArrPageNumbersForView = (currentPage, totalPages) => {
  const buttonsQuantity = 9;
  const ArrPageNumbersForView = [];

  let start = currentPage - Math.floor(buttonsQuantity / 2);
  let end = currentPage + Math.floor(buttonsQuantity / 2);

  if (start <= 0) {
    start = 1;
    end = buttonsQuantity;
  }
  if (end >= totalPages) {
    start = totalPages - (buttonsQuantity - 1);
    end = totalPages;
  }

  for (let index = start; index <= end; index++) {
    let pageNum = index;
    if (index === start) pageNum = 1;
    if (index === end) pageNum = totalPages;
    if (
      (index === start + 1 && pageNum != 2) ||
      (index === end - 1 && pageNum != totalPages - 1)
    ) {
      ArrPageNumbersForView.push('...');
      continue;
    }
    ArrPageNumbersForView.push(pageNum);
  }
  return ArrPageNumbersForView;
};

const markupUpdate = obj => {
  createCard(obj.data);
  pagination(obj);
};

const fetchPage = async (page = 1, search = '') => {
  let result = null;
  if (search) {
    result = await movieGalleryFetch.getSearchData(search, page);
  } else {
    result = await movieGalleryFetch.getTrendingData(page);
  }
  return result;
};

const onArrowClick = (evt, currentPage) => {
  const arrowEl = evt.target.closest('.arrow')
  if (arrowEl.hasAttribute('data-left_one_page')) {
    const prevPage = currentPage - 1;
    return prevPage < 1 ? 1 : prevPage;
  }
  if (arrowEl.hasAttribute('data-right_one_page')) {
    const nextPage = currentPage + 1;
    return nextPage > total_pages ? total_pages : nextPage;
  }
};

const onPaginationItemClick = async evt => {
  evt.preventDefault();
  let pageNum = null;
  const currentPage = parseInt(document.querySelector('.current').textContent);
  const paginButtonContent = evt.target.textContent;
  if (!(pageNum = parseInt(paginButtonContent))) pageNum = 1;
  if (paginButtonContent === '...') return;
  if (evt.target.closest('.arrow'))
    pageNum = onArrowClick(evt, currentPage);

  const data = await fetchPage(pageNum, search);
  markupUpdate(data);
  window.scrollTo(0, 0);
};

export default function pagination(fetchObj) {
  const paginationEl = document.querySelector('#pagination-list');

  paginationEl.innerHTML = paginationMarkup(
    getArrPageNumbersForView(fetchObj.page, fetchObj.total_pages),
    fetchObj.page
  );
  search = fetchObj.query;
  total_pages = fetchObj.total_pages;
  paginationEl.addEventListener('click', onPaginationItemClick);
}

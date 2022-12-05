import FetchData from './FetchData';
import createCard from './filmCards-home';

const movieGalleryFetch = new FetchData(); ////For develop
const search = '';

const paginationMarkup = (arr = [], page = 1) => {
  const currentPage = (arrItem, page) => (arrItem === page ? 'current' : '');

  return [
    `<li class="pagination-list__item"><button class="pagination-list__button">Arrow left</button></li>`,
    ...arr.map(
      item =>
        `<li class="pagination-list__item"><button class="pagination-list__button ${currentPage(
          item,
          page
        )}">${item}</button></li>`
    ),
    `<li class="pagination-list__item"><button class="pagination-list__button">Arrow right</button></li>`,
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

const onPaginationItemClick = async evt => {
  evt.preventDefault();
  const paginButtonContent = evt.target.textContent;
  if (paginButtonContent === '...') return;
  if (paginButtonContent.includes('Arrow')) return;

  let pageNum = null;

  if (!(pageNum = parseInt(paginButtonContent))) pageNum = 1;

  const data = await fetchPage(pageNum, search);
  markupUpdate(data);
};

export default pagination = (fetchObj, search = '') => {
  const paginationEl = document.querySelector('#pagination-list');

  paginationEl.innerHTML = paginationMarkup(
    getArrPageNumbersForView(fetchObj.page, fetchObj.total_pages),
    fetchObj.page
  );
  paginationEl.addEventListener('click', onPaginationItemClick);
};

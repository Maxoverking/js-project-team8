'use strict'
import axios from 'axios';
export default class FetchData {
  #API_KEY = '22fa368820f7f9af3c30ea0e6b34461d';
  #commonURL = 'https://api.themoviedb.org/3/';
  #trendingPath = 'trending/movie/day';
  #searchPath = 'search/movie';
  #params = {};

  constructor() {
    this.#params.api_key = this.#API_KEY;
  }
  // возвращает промис запроса на популярные фильмы
  getTrendingData(page=1) {
    return axios
      .get(this.#commonURL + this.#trendingPath, {
        params: { ...this.#params, page },
        transformResponse: transformResponseFunc,
      })
      //.then(res=>console.log(res))
      .then(pruningResponse)
      .catch(e => {
        console.log('getTrendingData ERROR - ' + e.message); // написать middleware для обработки ошибок и вывода их в HEADER
      });
  }

  // возвращает промис запроса на фильмы по поиску
  getSearchData(search, page = 1) {
    return axios
      .get(this.#commonURL + this.#searchPath, {
        params: { ...this.#params, query: `${search}`, page },
        transformResponse: transformResponseFunc,
      })
      .then(pruningResponse)
      .catch(e => {
        console.log('getSearchData ERROR - ' + e.message); // написать middleware для обработки ошибок и вывода их в HEADER
      });
  }

}

function transformResponseFunc(response) {
  let results = {};
  try {
    let dataResponse = JSON.parse(response);
    const { page, total_pages, total_results } = dataResponse;

    results.data = dataResponse.results.map(movieObj => {
      movieObj.backdrop_path = `https://image.tmdb.org/t/p/w500${movieObj.backdrop_path}`;
      movieObj.poster_path = `https://image.tmdb.org/t/p/w500${movieObj.poster_path}`;
      return movieObj;
    });
    results = { ...results, page, total_pages, total_results };
  } catch (error) {
    console.log('ошибка здесь', error);
    response.results.data = [];
  }

  return  results ;
}

function pruningResponse(res) {
  if (!res.config.params.query) {
    res.config.params.query = null;
  }
  return {
    ...res.data,
    status: res.status,
    statusText: res.statusText,
    query: res.config.params.query,
  };
}


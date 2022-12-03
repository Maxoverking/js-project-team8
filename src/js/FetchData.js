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

  getTrendingData(page = 1) {
    return axios
      .get(this.#commonURL + this.#trendingPath, {
        params: { ...this.#params, page },
        transformResponse: transformResponseFunc,
      })
      .catch(e => {
        return e.response; // написать middleware для обработки ошибок и вывода их в HEADER
      });
  }

  getSearchData(search) {
    return axios
      .get(this.#commonURL + this.#searchPath, {
        params: { ...this.#params, query: `${search}` },
        transformResponse: transformResponseFunc,
      })
      .catch(e => {
        return e.response; // написать middleware для обработки ошибок и вывода их в HEADER
      });
  }
}

function transformResponseFunc(response) {
  try {
    response = JSON.parse(response);
    results = response.results.map(movieObj => {
      movieObj.backdrop_path = `https://image.tmdb.org/t/p/w500${movieObj.backdrop_path}`;
      movieObj.poster_path = `https://image.tmdb.org/t/p/w500${movieObj.poster_path}`;
      return movieObj;
    });
  } catch (error) {
    //заглушка
  }
  return response;
}

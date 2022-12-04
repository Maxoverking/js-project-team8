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
  async getTrendingData(page = 1) {
    try {
      const response = await axios.get(this.#commonURL + this.#trendingPath, {
        params: { ...this.#params, page },
        transformResponse: transformResponseFunc,
      })
        .then(pruningResponse)
      return response;
    } catch (e) {
      console.log('getTrendingData ERROR - ' + e.message);
    }
  }

  // async getTrendingData(page = 1) {
  //   try {
  //     const result = await axios
  //       .get(this.#commonURL + this.#trendingPath, {
  //         params: { ...this.#params, page },
  //         transformResponse: transformResponseFunc,
  //       });
  //     return pruningResponse(result);
  //   } catch (e) {
  //     console.log('getTrendingData ERROR - ' + e.message); // написать middleware для обработки ошибок и вывода их в HEADER
  //   }
  // }

  async getSearchData(search, page = 1) {
    try {
      const result = await axios.get(this.#commonURL + this.#searchPath, {
        params: { ...this.#params, query: `${search}`, page },
        transformResponse: transformResponseFunc,
      });
      return pruningResponse(result);
    } catch (e) {
      console.log('getSearchData ERROR - ' + e.message); // написать middleware для обработки ошибок и вывода их в HEADER
    }
  }
}

function transformResponseFunc(response) {
  let results
  try {
    let dataResponse = JSON.parse(response);
    results = dataResponse.results.map(movieObj => {
      movieObj.backdrop_path = `https://image.tmdb.org/t/p/w500${movieObj.backdrop_path}`;
      movieObj.poster_path = `https://image.tmdb.org/t/p/w500${movieObj.poster_path}`;
      return movieObj;
    });
  } catch (error) {
    console.log("ошибка здесь", error);
    response.results = [];
  }
   console.log("🚀  results", results);
  return results;
}

 

function pruningResponse({ data, status, statusText }) {
  return { data, status, statusText };
}
import axios from 'axios';
const API_KEY = '06075111d285d6889482cec4dafeab0f';
export default async function fetchMovieSearch(query) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&include_adult=false&language=en-US&page=1`
  );
  if (!response.status) {
    throw new Error(response.status);
  }
  return response.data.results;
}

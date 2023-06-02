import axios from 'axios';
const API_KEY = '06075111d285d6889482cec4dafeab0f';
export default async function fetchMoviesDetails(movieId) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );
  if (!response.status) {
    throw new Error(response.status);
  }
  return response.data;
}

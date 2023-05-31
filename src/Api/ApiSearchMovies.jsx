import axios from 'axios';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjA3NTExMWQyODVkNjg4OTQ4MmNlYzRkYWZlYWIwZiIsInN1YiI6IjY0NzBhYjk4NTQzN2Y1MDEwNTVkNGIxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mRwEl_U4MyMEALk_4oMS15bcG2msMRPjTcvYuIf-KU8',
  },
};

export default async function fetchMovieSearch(query) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  if (!response.status) {
    throw new Error(response.status);
  }
  return response.data.results;
}

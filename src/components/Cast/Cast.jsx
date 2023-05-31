import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import fetchMoviesCast from 'Api/ApiFilmsCast';
import Loader from 'components/Loading/Loading';
export const Cast = () => {
  const { movieId } = useParams();
  const [filmCast, setFilmCast] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchMoviesActors(movieId);
  }, []);

  const fetchMoviesActors = async movieId => {
    setIsLoading(true);

    try {
      const response = await fetchMoviesCast(movieId);
      if (!response) {
        throw new Error('No data :-(');
      }
      const change = response.cast.map(item => {
        const posterPath = 'https://image.tmdb.org/t/p/w200';
        return (
          <div key={item.id}>
            <img src={`${posterPath}${item.profile_path}`} alt="" />
            <p>Name: {item.name}</p>
            <p>Character: {item.character}</p>
          </div>
        );
      });
      const changeForState = change.map(a => {
        return a;
      });
      setFilmCast(changeForState);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {filmCast}
      {isLoading && <Loader />}
    </div>
  );
};
export default Cast;

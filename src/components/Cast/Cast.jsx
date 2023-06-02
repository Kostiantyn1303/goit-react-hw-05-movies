import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import fetchMoviesCast from 'Api/ApiFilmsCast';
import Loader from 'components/Loading/Loading';
import { CastBox, CastItems, CastImg } from './Cast.styled';
export const Cast = () => {
  const { movieId } = useParams();
  const [filmCast, setFilmCast] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    fetchMoviesActors(movieId);
  }, [movieId]);

  const fetchMoviesActors = async movieId => {
    setIsLoading(true);

    try {
      const response = await fetchMoviesCast(movieId);
      if (!response.cast.length) {
        throw new Error('No data :-(');
      }
      const change = response.cast.map(item => {
        return (
          <CastItems key={item.id}>
            <CastImg
              src={
                item.profile_path
                  ? `https://image.tmdb.org/t/p/w200/${item.profile_path}`
                  : ''
              }
              alt={item.name}
            />
            <p>Name: {item.name}</p>
            <p>Character: {item.character}</p>
          </CastItems>
        );
      });
      const changeForState = change.map(a => {
        return a;
      });
      setFilmCast(changeForState);
    } catch (errorCaught) {
      setError(errorCaught);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(error);

  return (
    <CastBox>
      {error && <p>We don't have any information about cast of this film .</p>}
      {filmCast}
      {isLoading && <Loader />}
    </CastBox>
  );
};
export default Cast;

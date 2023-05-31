import { useSearchParams } from 'react-router-dom';
import fetchMovieSearch from 'Api/ApiSearchMovies';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Loader from 'components/Loading/Loading';
import styled from '@emotion/styled';
import { MoviesList } from './Movies.styled';
export const Movies = () => {
  const [film, setFilms] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams('');
  const query = searchParams.get('query') ?? '';
  const location = useLocation();
  const StyledLink = styled(Link)`
    color: black;

    &:hover {
      color: orange;
    }
  `;

  useEffect(() => {
    const fetchMoviesList = async query => {
      setIsLoading(true);

      try {
        const response = await fetchMovieSearch(query);
        if (!response) {
          throw new Error('No data :-(');
        }
        const visibleProducts = response.filter(respon =>
          respon.title.toLowerCase().includes(query.toLowerCase())
        );
        const filmsList = visibleProducts.map(item => {
          return (
            <MoviesList key={item.id}>
              <li>
                <StyledLink to={`${item.id}`} state={{ from: location }}>
                  {item.title}
                </StyledLink>
              </li>
            </MoviesList>
          );
        });
        setFilms(filmsList);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchMoviesList(query);
  }, [location, query]);

  const updateQueryString = evt => {
    if (evt.target.value === '') {
      return setSearchParams({});
    }
    setSearchParams({ query: evt.target.value });
  };
  return (
    <>
      <form onSubmit={updateQueryString}>
        <input type="text" name="query" />
        <button type="submit">Search</button>
      </form>
      <div>{film}</div>
      {isLoading && <Loader />}
    </>
  );
};
export default Movies;

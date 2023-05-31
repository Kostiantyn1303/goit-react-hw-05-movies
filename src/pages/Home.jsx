import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import fetchMovies from 'Api/Api';
import { Link } from 'react-router-dom';
import Loader from 'components/Loading/Loading';
import { HomeList, HomeTitle } from './Home.styled';
import styled from '@emotion/styled';
const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [moviesList, setMovieList] = useState([]);
  const location = useLocation();

  const StyledLink = styled(Link)`
    color: black;

    &:hover {
      color: orange;
    }
  `;

  useEffect(() => {
    const fetchMoviesList = async () => {
      setIsLoading(true);

      try {
        const response = await fetchMovies();
        if (!response) {
          throw new Error('No data :-(');
        }
        const selectedProperties = response.map(respon => {
          return (
            <HomeList key={respon.id}>
              <li>
                <StyledLink
                  to={`movies/${respon.id}`}
                  state={{ from: location }}
                >
                  {respon.title}
                </StyledLink>
              </li>
            </HomeList>
          );
        });

        setMovieList(selectedProperties);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    fetchMoviesList();
  }, [location]);

  return (
    <>
      <HomeTitle>Trending today </HomeTitle>
      {moviesList}
      {isLoading && <Loader />}
    </>
  );
};

export default Home;

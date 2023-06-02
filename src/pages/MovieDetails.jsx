import { Outlet, useParams } from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import fetchMoviesDetails from 'Api/ApiFilmDetails';
import { Link } from 'react-router-dom';
import Loader from 'components/Loading/Loading';
import styled from '@emotion/styled';

import {
  Title,
  Information,
  Owerview,
  Scors,
  AddInformation,
  MovieDetailsLinkList,
  AddInformationbox,
  Container,
  Image,
  ImageBox,
} from './MovieDetails.styled';
const MovieDetails = () => {
  const [filmDetails, setFilmDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { movieId } = useParams();

  const location = useLocation();
  const backLink = useRef(location.state?.from ?? '/');
  const StyledLink = styled(Link)`
    color: black;

    &:hover {
      color: orange;
    }
  `;

  const StyledLinkBtn = styled(Link)`
    color: black;
    text-decoration: none;
    padding: 5px;
    border: 1px solid;
    margin-bottom: 5px;
    display: block;
    width: 60px;

    &:hover {
      color: orange;
    }
  `;
  useEffect(() => {
    const getMovieInformation = async movieId => {
      setIsLoading(true);
      try {
        const movieData = await fetchMoviesDetails(movieId);
        if (!movieData) {
          throw new Error('No data! :-(');
        }
        setFilmDetails(movieData); // Записуємо в стейт обєкт з даними
      } catch (errorCaught) {
        setError(errorCaught);
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) {
      getMovieInformation(movieId);
    }
  }, [movieId]);

  const date = new Date(filmDetails.release_date);
  const score = filmDetails.vote_average * 10;

  return (
    <div>
      <StyledLinkBtn to={backLink.current}>Go back</StyledLinkBtn>
      <Container>
        {isLoading && <Loader />}
        {error && 'Sorry, there is no data for the selected movie.'}
        <ImageBox>
          <Image
            src={
              filmDetails.poster_path
                ? `https://image.tmdb.org/t/p/w400/${filmDetails.poster_path}`
                : ''
            }
            alt="movie_picture"
            width="300"
          />
        </ImageBox>
        <div>
          <Title>
            {filmDetails.title} ({date.getFullYear()})
          </Title>
          <Scors>User score:{Math.round(score)} %</Scors>
          <Owerview>Owerview </Owerview>
          <Information>{filmDetails.overview}</Information>
        </div>
      </Container>
      <AddInformationbox>
        <AddInformation>Additional information </AddInformation>
        <MovieDetailsLinkList>
          <li>
            <StyledLink to="cast">Cast</StyledLink>
          </li>
          <li>
            <StyledLink to="reviews">Reviews</StyledLink>
          </li>
        </MovieDetailsLinkList>
      </AddInformationbox>

      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetails;

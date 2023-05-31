import { Outlet, useParams } from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';
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
} from './MovieDetails.styled';
const MovieDetails = () => {
  const [filmDetails, setFilmDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();
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
    fetchMoviesInformation(movieId);
  }, [movieId]);

  const fetchMoviesInformation = async movieId => {
    setIsLoading(true);

    try {
      const response = await fetchMoviesDetails(movieId);
      if (!response) {
        throw new Error('No data :-(');
      }

      setFilmDetails(response);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const posterPath = 'https://image.tmdb.org/t/p/w500';
  const date = new Date(filmDetails.release_date);
  const score = filmDetails.vote_average * 10;

  return (
    <div>
      <StyledLinkBtn to={location.state?.from ?? '/'}>Go back</StyledLinkBtn>
      <Container>
        {' '}
        <div>
          <img src={`${posterPath}${filmDetails.poster_path}`} alt="" />
        </div>
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
      {isLoading && <Loader />}
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetails;

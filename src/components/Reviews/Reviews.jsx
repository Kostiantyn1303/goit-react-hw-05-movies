import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import fetchMoviesReviews from 'Api/ApiFilmsReviews';
import Loader from 'components/Loading/Loading';
import { Athour, Content } from './Reviews.styled';
export const Reviews = () => {
  const { movieId } = useParams();
  const [filmReview, setFilmReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchMoviesCovers(movieId);
  }, [movieId]);

  const fetchMoviesCovers = async movieId => {
    setIsLoading(true);

    try {
      const response = await fetchMoviesReviews(movieId);
      if (!response) {
        throw new Error('No data :-(');
      }

      const changeReviewss = response.map(item => {
        return (
          <div key={item.id}>
            <Athour>{item.author}</Athour>
            <Content>{item.content}</Content>
          </div>
        );
      });
      setFilmReview(changeReviewss);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {filmReview}
      {isLoading && <Loader />}
    </div>
  );
};
export default Reviews;

import { useQuery } from '@apollo/client';
import AddReview from '../../components/AddReview/AddReview';
import KommuneDetails from '../../components/KommuneDetails/KommuneDetails';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import { useParams } from 'react-router-dom';
import { GET_REVIEWS } from '../../services/reviewService';
import { Review } from '../../types/review';
import { useEffect, useState } from 'react';
import './DetailsPage.css';

export default function DetailsPage() {
  const { id } = useParams();
  const { error, data } = useQuery(GET_REVIEWS, {
    variables: { id: id },
  });
  const [reviews, setReviews] = useState([] as Review[]);

  if (error) console.log(error);

  useEffect(() => {
    setReviews(data?.kommune.kommuneRating);
  }, [data]);

  function addReview(review: Review) {
    setReviews([...reviews, review]);
  }

  return (
    <div className='detailsPage'>
      <KommuneDetails />
      <div className='reviews'>
        <AddReview onCreate={addReview} />
        {reviews
          ?.slice(0)
          .reverse()
          .map((review: Review) => {
            return (
              <ReviewCard
                key={review._id}
                title={review.title}
                description={review.description}
                rating={review.rating}
                name={review.name}
                timestamp={review.timestamp}
              />
            );
          })}
      </div>
    </div>
  );
}

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
  const { kommuneSlug } = useParams();
  const { loading: loadingReviews, error: errorReviews, data: dataReviews } = useQuery(GET_REVIEWS, {
    variables: { kommuneName: kommuneSlug },
  });
  const [reviews, setReviews] = useState([] as Review[])

  useEffect(() => {
    setReviews(dataReviews?.kommune.kommuneRating);
  }, [dataReviews])

  function addReview(review: any) {
    setReviews([review, ...reviews])
  }

  return (
    <div className='detailsPage'>
      <KommuneDetails />
      <div className='reviews'>
        <AddReview onCreate={addReview} />
        {reviews?.map((review: Review) => {
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

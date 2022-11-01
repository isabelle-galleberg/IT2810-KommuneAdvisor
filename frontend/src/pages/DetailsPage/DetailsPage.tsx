import { useQuery } from '@apollo/client';
import AddReview from '../../components/AddReview/AddReview';
import KommuneDetails from '../../components/KommuneDetails/KommuneDetails';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import { useParams } from 'react-router-dom';
import { GET_REVIEWS } from '../../services/reviewService';
import { Review } from '../../types/review';
import { useEffect, useState } from 'react';
import './DetailsPage.css';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

export default function DetailsPage() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_REVIEWS, {
    variables: { id: id },
  });
  const [reviews, setReviews] = useState([] as Review[]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setReviews(data?.kommune.kommuneRating);
  }, [data]);

  function addReview(review: Review) {
    setReviews([...reviews, review]);
    setRefresh(true);
    setRefresh(false);
  }

  if (loading) return <LoadingSpinner />;
  if (error) return <div>No reviews found</div>;

  return (
    <div className='detailsPage'>
      <KommuneDetails refresh={refresh} />
      <div className='reviews'>
        <AddReview onCreate={addReview} />
        {reviews && reviews.length ? (
          reviews
            .slice(0)
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
            })
        ) : (
          <div>Vær den første til å gi en vurdering!</div>
        )}
      </div>
    </div>
  );
}

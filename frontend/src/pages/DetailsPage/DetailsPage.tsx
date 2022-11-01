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
  // url param kommune/:id
  const { id } = useParams();

  // get review data from GraphQL
  const { loading, error, data } = useQuery(GET_REVIEWS, {
    variables: { id: id },
  });

  // state for reviews
  const [reviews, setReviews] = useState([] as Review[]);
  // update page when refresh is true
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setReviews(data?.kommune.kommuneRating);
  }, [data]);

  // add a new review for the given kommune and refresh the page
  function addReview(review: Review) {
    setReviews([...reviews, review]);
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1);
  }

  // loading and error handling
  if (loading) return <LoadingSpinner />;
  if (error) return <div>Ingen vurdering funnet</div>;

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

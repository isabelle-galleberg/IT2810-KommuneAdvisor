// This page is for testing purposes only. It will be removed later.

import ReviewCard from '../../components/ReviewCard/ReviewCard';
import './ReviewPage.css';

export default function ReviewPage() {
  return (
    <div className='reviewCards'>
      <ReviewCard
        rating={2}
        title={'Et høl'}
        text={'Jeg besøkte Trondheim i sommer og vil aldri tilbake igjen!'}
        author={'-Isabelle Galleberg'}
      />
    </div>
  );
}

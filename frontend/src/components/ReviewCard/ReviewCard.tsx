import './ReviewCard.css';
import { Rating } from 'react-simple-star-rating';
import { Review } from '../../types/review';

export default function ReviewCard({
  title,
  description,
  rating,
  name,
  timestamp,
}: Review) {

  // convert from timestamp to date
  const date = new Date(Number(timestamp)).toLocaleString().split(',')[0];

  return (
    <div className='reviewCard'>
      <div className='reviewCardTop'>
        <Rating
          initialValue={rating}
          readonly
          size={20}
        />
        <div className='date'>{date}</div>
      </div>
      <div className='reviewCardBottom'>
        <div className='title'>{title}</div>
        <div className='description'>{description}</div>
        <div className='name'>{`- ${name}`}</div>
      </div>
    </div>
  );
}

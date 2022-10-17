import { ReviewCardProps } from '../../types/propTypes';
import './ReviewCard.css';
import { Rating } from 'react-simple-star-rating';

export default function ReviewCard({
  title,
  description,
  rating,
  name,
  date,
}: ReviewCardProps) {
  return (
    <div className='reviewCard'>
      <Rating
        initialValue={rating}
        readonly
        size={20}
        iconsCount={rating}
      />
      <div className='title'>{title}</div>
      <div className='description'>{description}</div>
      <div className='date'>{date + ' ' + name}</div>
    </div>
  );
}

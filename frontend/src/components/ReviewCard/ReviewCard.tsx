import { useEffect } from 'react';
import { ReviewCardProps } from '../../types/propTypes';
import './ReviewCard.css';

export default function ReviewCard({
  rating,
  title,
  text,
  author,
}: ReviewCardProps) {
  return (
    <div className='reviewCard'>
      <div className='rating'>
        {[...Array(rating)].map((e, i) => (
          <img
            className='star'
            src={require('../../assets/Stars/filledStar.png')}
            alt='filled star'
            key={i}
          />
        ))}
        {[...Array(3 - rating)].map((e, i) => (
          <img
            className='star'
            src={require('../../assets/Stars/emptyStar.png')}
            alt='empty star'
            key={i}
          />
        ))}
      </div>
      <div className='title'>{title}</div>
      <div className='text'>{text}</div>
      <div className='author'>{author}</div>
    </div>
  );
}

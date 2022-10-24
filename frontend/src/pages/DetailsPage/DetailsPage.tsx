import AddReview from '../../components/AddReview/AddReview';
import KommuneDetails from '../../components/KommuneDetails/KommuneDetails';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import './DetailsPage.css';

const reviews = [
  {
    title: 'Great product',
    description: 'I visited Trondheim kommune and it was so pretty, omg!',
    rating: 3,
    name: 'Ola Olè',
    date: '10.10.2020',
    id: 1,
  },
  {
    title: 'Great product',
    description: 'I visited Trondheim kommune and it was so pretty, omg!',
    rating: 3,
    name: 'Ola Olè',
    date: '10.10.2020',
    id: 2,
  },
  {
    title: 'Great product',
    description: 'I visited Trondheim kommune and it was so pretty, omg!',
    rating: 3,
    name: 'Ola Olè',
    date: '10.10.2020',
    id: 3,
  },
  {
    title: 'Great product',
    description: 'I visited Trondheim kommune and it was so pretty, omg!',
    rating: 3,
    name: 'Ola Olè',
    date: '10.10.2020',
    id: 4,
  },
  {
    title: 'Great product',
    description: 'I visited Trondheim kommune and it was so pretty, omg!',
    rating: 3,
    name: 'Ola Olè',
    date: '10.10.2020',
    id: 5,
  },
];

export default function DetailsPage() {
  return (
    <div className='detailsPage'>
      <KommuneDetails />
      <div className='reviews'>
        <AddReview />
        {reviews.map((review) => {
          return (
            <ReviewCard
              key={review.id}
              title={review.title}
              description={review.description}
              rating={review.rating}
              name={review.name}
              date={review.date}
            />
          );
        })}
      </div>
    </div>
  );
}

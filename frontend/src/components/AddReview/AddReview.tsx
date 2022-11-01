import { useState } from 'react';
import { Modal, Button, Group, Textarea, TextInput } from '@mantine/core';
import { Rating } from 'react-simple-star-rating';
import { Review } from '../../types/review';
import { POST_REVIEW } from '../../services/reviewService';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { AddReviewProps } from '../../types/propTypes';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './AddReview.css';
import { getRatingDescription } from '../../services/getRatingDescription';

export default function AddReview({ onCreate }: AddReviewProps) {
  // url param kommune/:id
  const { id } = useParams();
  // post review data to GraphQL
  const [postReview, { loading, error }] = useMutation(POST_REVIEW);

  const [opened, setOpened] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [ratingDescription, setRatingDescription] = useState<string>('');
  const [review, setReview] = useState<Review>({
    rating: 0,
    name: '',
    title: '',
    description: '',
  });

  function openModal() {
    // resets values
    setReview({ rating: 0, name: '', title: '', description: '' });
    handleRating(0);
    setOpened(true);
  }

  async function addReview() {
    // display error message if required fields are empty
    if (
      review.rating === 0 ||
      review.name === '' ||
      review.title === '' ||
      review.description === ''
    ) {
      setErrorMessage(true);
    }
    // post review to GraphQL
    else {
      const response = await postReview({
        variables: {
          name: review.name,
          rating: review.rating,
          title: review.title,
          description: review.description,
          kommuneId: id,
        },
      });
      review._id = response.data.addKommuneRating._id;
      review.timestamp = response.data.addKommuneRating.timestamp;
      onCreate(review);
      setOpened(false);
    }
  }

  function cancelReview() {
    setOpened(false);
    handleRating(0);
  }

  // update fields based on user input
  function handleRating(rating: number) {
    setReview({ ...review, rating: rating });
    updateRatingDescription(rating);
  }
  function updateName(name: string) {
    setErrorMessage(false);
    setReview({ ...review, name: name });
  }
  function updateTitle(title: string) {
    setErrorMessage(false);
    setReview({ ...review, title: title });
  }
  function updateDescription(description: string) {
    setErrorMessage(false);
    setReview({ ...review, description: description });
  }
  function updateRatingDescription(rating: number) {
    setErrorMessage(false);
    setRatingDescription(getRatingDescription(rating));
  }

  // loading and error handling
  if (loading) return <LoadingSpinner />;
  if (error) return <div>Kunne ikke legge til vurdering</div>;

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => cancelReview()}
        title='Gi kommunen en vurdering!'>
        {
          <div className='modalContainer'>
            <div
              data-cy='add-review-rating'
              className='ratingContainer'>
              <Rating
                className='rating'
                onClick={handleRating}
                onPointerLeave={() => updateRatingDescription(review.rating)}
                onPointerMove={(value: number) =>
                  updateRatingDescription(value)
                }
                size={30}
              />
              {ratingDescription}
            </div>
            <div className='textfieldContainer'>
              <TextInput
                data-cy='add-review-title'
                placeholder='Skriv her'
                label='Gi anmeldelsen en tittel'
                onChange={(event) => updateTitle(event.currentTarget.value)}
              />
              <Textarea
                data-cy='add-review-description'
                placeholder='Skriv her'
                label='Legg igjen en anmeldelse'
                onChange={(event) =>
                  updateDescription(event.currentTarget.value)
                }
              />
              <TextInput
                data-cy='add-review-name'
                placeholder='Skriv her'
                label='Oppgi navn'
                onChange={(event) => updateName(event.currentTarget.value)}
              />
            </div>
            {errorMessage && (
              <div className='errorMessage'>Vennligst fyll ut alle feltene!</div>
            )}
            <div className='buttonsContainer'>
              <Button
                data-cy='btn-add-review'
                onClick={() => addReview()}>
                Del
              </Button>
              <Button onClick={() => cancelReview()}>Avbryt</Button>
            </div>
          </div>
        }
      </Modal>

      <Group position='center'>
        <Button
          data-cy='btn-open-add-review'
          onClick={() => openModal()}>
          Legg til vurdering
        </Button>
      </Group>
    </>
  );
}

import { useState } from 'react';
import { Modal, Button, Group, Textarea, TextInput } from '@mantine/core';
import { Rating } from 'react-simple-star-rating';
import { Review } from '../../types/review';
import { POST_REVIEW } from '../../services/reviewService';
import { useMutation, useQuery } from '@apollo/client';
import { GET_KOMMUNE_ID } from '../../services/kommuneService';
import { useParams } from 'react-router-dom';
import { AddReviewProps } from '../../types/propTypes';
import './AddReview.css';

export default function AddReview({
  onCreate
}: AddReviewProps) {
  const { kommuneSlug } = useParams();
  const { loading: loadingKommuneId, error: errorKommuneId, data: dataKommuneId } = useQuery(GET_KOMMUNE_ID, {
    variables: { name: kommuneSlug },
  });
  const [postReview, { data: dataPostReview, loading: loadingPostReview, error: errorPostReview }] = useMutation(POST_REVIEW);
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
    if (
      review.rating === 0 ||
      review.name === '' ||
      review.title === '' ||
      review.description === ''
    ) {
      setErrorMessage(true);
    } else {
      const response = await postReview({
        variables: {
          name: review.name,
          rating: review.rating,
          title: review.title,
          description: review.description,
          kommuneId: dataKommuneId?.kommune[0]._id
        }
      });
      setOpened(false);
    }
  }

  function cancelReview() {
    setOpened(false);
    handleRating(0);
  }

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
    if (rating == 1) setRatingDescription('Forferdelig');
    else if (rating == 2) setRatingDescription('Dårlig');
    else if (rating == 3) setRatingDescription('Gjennomsnitt');
    else if (rating == 4) setRatingDescription('Svært bra');
    else if (rating == 5) setRatingDescription('Ypperlig');
    else setRatingDescription('');
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => cancelReview()}
        title='Gi kommunen en vurdering!'>
        {
          <div className='modalContainer'>
            <div className='ratingContainer'>
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
                placeholder='Skriv her'
                label='Oppgi navn'
                onChange={(event) => updateName(event.currentTarget.value)}
              />
              <TextInput
                placeholder='Skriv her'
                label='Gi anmeldelsen en tittel'
                onChange={(event) => updateTitle(event.currentTarget.value)}
              />
              <Textarea
                placeholder='Skriv her'
                label='Legg igjen en anmeldelse'
                onChange={(event) =>
                  updateDescription(event.currentTarget.value)
                }
              />
            </div>
            {errorMessage && (
              <div className='errorMessage'>Please fill in all the fields!</div>
            )}
            <div className='buttonsContainer'>
              <Button onClick={() => addReview()}>Del</Button>
              <Button onClick={() => cancelReview()}>Avbryt</Button>
            </div>
          </div>
        }
      </Modal>

      <Group position='center'>
        <Button onClick={() => openModal()}>Legg til vurdering</Button>
      </Group>
    </>
  );
}

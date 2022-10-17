import { useState } from 'react';
import { Modal, Button, Group, Textarea, TextInput } from '@mantine/core';
import './AddReview.css';
import { Rating } from 'react-simple-star-rating';

export default function AddReview() {
  const [opened, setOpened] = useState(false);
  const [rating, setRating] = useState(0);
  const [ratingDescription, setRatingDescription] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState(false);

  function openModal() {
    setOpened(true);
    // resets the values
    setRating(0);
    setName('');
    setTitle('');
    setDescription('');
  }

  function addReview() {
    if (rating === 0 || name === '' || title === '' || description === '') {
      setErrorMessage(true);
    }
    else {
      console.log(rating, name, title, description);
      setOpened(false);
      handleRating(0);
    }
  }
  function cancelReview() {
    setOpened(false);
    handleRating(0);
  }

  const handleRating = (rating: number) => {
    setRating(rating);
    updateRatingDescription(rating);
  }

  function updateName(name: string) {
    setErrorMessage(false);
    setName(name);
  }
  function updateTitle(title: string) {
    setErrorMessage(false);
    setTitle(title);
  }
  function updateDescription(description: string) {
    setErrorMessage(false);
    setDescription(description);
  }

  function updateRatingDescription(rating: number) {
    setErrorMessage(false);
    if (rating == 1) setRatingDescription('Forferdelig')
    else if (rating == 2) setRatingDescription('Dårlig')
    else if (rating == 3) setRatingDescription('Gjennomsnitt')
    else if (rating == 4) setRatingDescription('Svært bra')
    else if (rating == 5) setRatingDescription('Ypperlig')
    else setRatingDescription('')
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => cancelReview()}
        title="Gi kommunen en vurdering!"
      >
        {
          <div className='modalContainer'>
            <div className='ratingContainer'>
              <Rating
                className='rating'
                onClick={handleRating}
                onPointerLeave={() => updateRatingDescription(rating)}
                onPointerMove={(value: number) => updateRatingDescription(value)}
              />
              {ratingDescription}
            </div>
            <div className='textfieldContainer'>
              <TextInput
                placeholder="Skriv her"
                label="Oppgi navn"
                onChange={(event) => updateName(event.currentTarget.value)}
              />
              <TextInput
                placeholder="Skriv her"
                label="Gi anmeldelsen en tittel"
                onChange={(event) => updateTitle(event.currentTarget.value)}
              />
              <Textarea
                placeholder="Skriv her"
                label="Legg igjen en anmeldelse"
                onChange={(event) => updateDescription(event.currentTarget.value)}
              />
            </div>
            {errorMessage && (
              <div className="errorMessage">
                Please fill in all the fields!
              </div>
            )}
            <div className='buttonsContainer'>
              <Button onClick={() => addReview()}>Del</Button>
              <Button onClick={() => cancelReview()}>Avbryt</Button>
            </div>
          </div>
        }
      </Modal>

      <Group position="center">
        <Button onClick={() => openModal()}>Legg til vurdering</Button>
      </Group>
    </>
  );
}
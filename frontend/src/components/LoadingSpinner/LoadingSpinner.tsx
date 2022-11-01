import { Loader } from '@mantine/core';
import './LoadingSpinner.css';

export default function LoadingSpinner() {
  return (
    <Loader
      size='xl'
      className='loadingSpinner'
      data-cy='loading-spinner'
    />
  );
}

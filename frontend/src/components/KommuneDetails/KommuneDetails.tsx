import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { GET_KOMMUNE } from '../../services/kommuneService';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './KommuneDetails.css';

export default function KommuneDetails() {
  // url param kommune/:name
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_KOMMUNE, {
    variables: { id: id },
  });

  if (loading) return <LoadingSpinner />;
  if (error) console.log(error);

  return (
    <>
      {data && data.kommune && data.kommune ? (
        <div className='detailsPage'>
          <div className='detailsPageTop'>
            <Link to='/'>
              <img
                data-cy='back-arrow'
                className='backArrow'
                src={require('../../assets/backArrow.png')}
                alt=''
              />
            </Link>
            <img
              data-cy='kommune-logo'
              src={data.kommune.logoUrl}
              className='weaponImg'
            />
            <h1 data-cy='kommune-name'>{data.kommune.name}</h1>
          </div>
          <div className='line'></div>
          <div className='kommuneDetails'>
            <div>
              <div className='rating'>
                <Rating
                  initialValue={data.kommune.averageRating}
                  readonly
                  size={30}
                />
                <div data-cy='kommune-rating' className='averageRating'>
                  ({data.kommune.averageRating})
                </div>
              </div>
              <p data-cy='kommune-county'>📍 {data.kommune.county.name}</p>
              <p data-cy='kommune-population'>👨‍👩‍👧‍👧 {data.kommune.population}</p>
              <p data-cy='kommune-area'>
                🏔 {data.kommune.areaInSquareKm}
                km<sup>2</sup>
              </p>
              <p data-cy='kommune-written-language'>📝 {data.kommune.writtenLanguage}</p>
              <p>
                Les mer her:{' '}
                <a
                  href={data.kommune.snlLink}
                  target='_blank'
                  rel='noreferrer'>
                  {data.kommune.name}
                </a>
              </p>
            </div>
            <img
              data-cy='kommune-map'
              src={data.kommune.mapUrl}
              alt='kommuneMap'
              className='mapImg'
            />
          </div>
        </div>
      ) : (
        <div>Kommune not found</div>
      )}
    </>
  );
}

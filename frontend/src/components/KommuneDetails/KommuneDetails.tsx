import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { GET_KOMMUNE } from '../../services/kommuneService';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './KommuneDetails.css';

export default function KommuneDetails() {
  // url param kommune/:name
  const { kommuneSlug } = useParams();

  const { loading, error, data } = useQuery(GET_KOMMUNE, {
    variables: { kommuneName: kommuneSlug },
  });

  if (loading) return <LoadingSpinner />;
  if (error) console.log(error);

  return (
    <>
      {data && data.kommune && data.kommune[0] ? (
        <div className='detailsPage'>
          <div className='detailsPageTop'>
            <Link to='/'>
              <img
                className='backArrow'
                src={require('../../assets/backArrow.png')}
                alt=''
              />
            </Link>
            <img
              src={data.kommune[0].logoUrl}
              className='weaponImg'
            />
            <h1>{data.kommune[0].name}</h1>
          </div>
          <div className='line'></div>
          <div className='kommuneDetails'>
            <div>
              <Rating
                initialValue={3}
                readonly
                size={30}
              />
              <p>📍 {data.kommune[0].county}</p>
              <p>👨‍👩‍👧‍👧 {data.kommune[0].population}</p>
              <p>
                🏔 {data.kommune[0].areaInSquareKm}
                km<sup>2</sup>
              </p>
              <p>📝 {data.kommune[0].writtenLanguage}</p>
              <p>
                Les mer her:{' '}
                <a
                  href={`https://snl.no/${kommuneSlug}`}
                  target='_blank'
                  rel='noreferrer'>
                  {kommuneSlug}
                </a>
              </p>
            </div>
            <img
              src={data.kommune[0].mapUrl}
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

import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { GET_KOMMUNE } from '../../services/kommuneService';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './KommuneDetails.css';

export default function KommuneDetails({ refresh }: { refresh: boolean }) {
  // url param kommune/:id
  const { id } = useParams();

  // get kommune data from GraphQL
  const { loading, error, data, refetch } = useQuery(GET_KOMMUNE, {
    variables: { id: id },
  });

  // refetch data when the a new review is added to update kommune data
  useEffect(() => {
    if (refresh) {
      refetch();
    }
  }, [refresh]);

  // loading and error handling
  if (loading) return <LoadingSpinner />;
  if (error) return <div>Kommune ikke funnet</div>;

  return (
    <>
      {data && data.kommune && data.kommune && (
        <div className='detailsPage'>
          <div className='detailsPageTop'>
            <Link to='/'>
              <img
                data-cy='back-arrow'
                className='backArrow'
                src={require('../../assets/backArrow.png')}
                alt='backArrow'
              />
            </Link>
            <img
              data-cy='kommune-logo'
              src={data.kommune.logoUrl}
              className='weaponImg'
              alt='kommuneWeaponImage'
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
                  {data.kommune.averageRating != 0
                    ? '(' + data.kommune.averageRating.toFixed(2) + ')'
                    : '(Ingen vurderinger)'}
                </div>
              </div>
              <label>📍 Fylke</label>
              <p data-cy='kommune-county'>{data.kommune.county.name}</p>
              <label>👨‍👩‍👧‍👧 Innbyggertall</label>
              <p data-cy='kommune-population'>{data.kommune.population}</p>
              <label>🏔 Areal</label>
              <p data-cy='kommune-area'>
                {data.kommune.areaInSquareKm}
                km<sup>2</sup>
              </p>
              <label>📝 Skriftspråk</label>
              <p data-cy='kommune-written-language'>{(data.kommune.writtenLanguage).charAt(0).toUpperCase() + (data.kommune.writtenLanguage).slice(1)}</p>
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
      )}
    </>
  );
}

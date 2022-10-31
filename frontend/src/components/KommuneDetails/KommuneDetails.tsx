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

  const { loading, error, data, refetch } = useQuery(GET_KOMMUNE, {
    variables: { id: id },
  });
  useEffect(() => {
    if (refresh) {
      refetch();
    }
  }, [refresh]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Kommune not found</div>;

  return (
    <>
      {data && data.kommune && data.kommune && (
        <div className='detailsPage'>
          <div className='detailsPageTop'>
            <Link to='/'>
              <img
                className='backArrow'
                src={require('../../assets/backArrow.png')}
                alt='backArrow'
              />
            </Link>
            <img
              src={data.kommune.logoUrl}
              className='weaponImg'
              alt='kommuneWeaponImage'
            />
            <h1>{data.kommune.name}</h1>
          </div>
          <div className='line'></div>
          <div className='kommuneDetails'>
            <div>
              <label>Gjennomsnittlig vurdering</label>
              <p className='rating'>
                <Rating
                  initialValue={data.kommune.averageRating}
                  readonly
                  size={30}
                />
                <div className='averageRating'>
                  {data.kommune.averageRating != 0
                    ? '(' + data.kommune.averageRating.toFixed(2) + ')'
                    : '(Ingen vurderinger)'}
                </div>
              </p>
              <label>📍 Fylke</label>
              <p>{data.kommune.county.name}</p>
              <label>👨‍👩‍👧‍👧 Innbyggertall</label>
              <p>{data.kommune.population}</p>
              <label>🏔 Areal</label>
              <p>
                {data.kommune.areaInSquareKm}
                km<sup>2</sup>
              </p>
              <label>📝 Skriftspråk</label>
              <p> {data.kommune.writtenLanguage}</p>
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

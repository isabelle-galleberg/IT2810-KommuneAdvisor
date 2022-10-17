import { useParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import './KommuneDetails.css';

export default function KommuneDetails() {
  // This will be used later to fetch data from the backend
  const { kommuneSlug } = useParams();

  // Dummy data
  const kommuneData = {
    name: 'Lier',
    weaponImg: require('../../assets/lier.svg.png'),
    rating: 3,
    county: 'Viken',
    population: '407 704',
    area: '100 000',
    language: 'bokmål',
    mapImg: require('../../assets/map.png'),
  };

  const url = `https://no.wikipedia.org/wiki/${kommuneData.name.replace(
    ' ',
    '_'
  )}`;

  return (
    <div className='detailsPage'>
      <div className='detailsPageTop'>
        <img
          src={kommuneData.weaponImg}
          className='weaponImg'
        />
        <h1>{kommuneData.name}</h1>
      </div>
      <div className='line'></div>
      <div className='kommuneDetails'>
        <div>
          <Rating
            initialValue={kommuneData.rating}
            readonly
            size={30}
          />
          <p>📍 {kommuneData.county}</p>
          <p>👨‍👩‍👧‍👧 {kommuneData.population}</p>
          <p>🏔 {kommuneData.area}</p>
          <p>📝 {kommuneData.language}</p>
          <p>
            Les mer her:{' '}
            <a
              href={url}
              target='_blank'
              rel='noreferrer'>
              {kommuneData.name}
            </a>
          </p>
        </div>
        <img
          src={kommuneData.mapImg}
          alt='kommuneMap'
          className='mapImg'
        />
      </div>
    </div>
  );
}

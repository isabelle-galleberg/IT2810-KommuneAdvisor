import renderer from 'react-test-renderer';
import { KommuneCardProps } from '../types/propTypes';
import KommuneCard from '../components/KommuneCard/KommuneCard';
import { BrowserRouter as Router } from 'react-router-dom';

const data: KommuneCardProps = {
  id: '1',
  name: 'Oslo',
  county: 'Oslo',
  rating: 4.5,
  weaponImg:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Oslo_komm.svg/1024px-Oslo_komm.svg.png',
};

describe('<KommuneCard />', () => {
  it('should match snapshot with data', () => {
    const elem = renderer
      .create(
        <Router>
          <KommuneCard
            id={data.id}
            name={data.name}
            county={data.county}
            weaponImg={data.weaponImg}
            rating={data.rating}
          />
        </Router>
      )
      .toJSON();

    expect(elem).toMatchSnapshot();
  });
});

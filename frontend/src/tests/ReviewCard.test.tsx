import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import { Review } from '../types/review';
import ReviewCard from '../components/ReviewCard/ReviewCard';

const data: Review = {
  title: 'Fint sted',
  description: 'Molde var ikke så stygt som jeg trodde!',
  rating: 4.5,
  name: 'Kong Olav',
};

describe('<ReviewCard />', () => {
  it('should match snapshot with data', () => {
    const elem = renderer
      .create(
        <Router>
          <ReviewCard
            title={data.title}
            description={data.description}
            rating={data.rating}
            name={data.name}
          />
        </Router>
      )
      .toJSON();

    expect(elem).toMatchSnapshot();
  });
});

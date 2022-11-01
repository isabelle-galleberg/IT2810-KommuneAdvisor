import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from '../App';
import { store } from '../redux/store';

describe('<App />', () => {
  test('renders App component without crashing', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});

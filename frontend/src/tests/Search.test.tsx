import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import MainPage from '../pages/MainPage/MainPage';
import { store } from '../redux/store';

describe('<SearchInput />', () => {
  it('search field reacts correctly according to user input', () => {
    const client = new ApolloClient({
      uri: process.env.REACT_APP_API_URL + '/graphql',
      cache: new InMemoryCache(),
    });

    const { getByLabelText } = render(
      <Provider store={store}>
        <ApolloProvider client={client}>
          <MainPage />
        </ApolloProvider>
      </Provider>
    );

    const inputText = 'Bodø';
    const input = getByLabelText('Søk etter en kommune') as HTMLInputElement;

    userEvent.type(input, inputText);

    expect(input.value).toBe(inputText);
  });
});

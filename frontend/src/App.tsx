import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage/MainPage';
import Navbar from './components/Navbar/Navbar';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

function App() {
  const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL + '/graphql',
    cache: new InMemoryCache(),
  });
  return (
    <div>
      <ApolloProvider client={client}>
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={<MainPage />}
            />
          </Routes>
          <Routes>
            <Route
              path='kommune/:id'
              element={<DetailsPage />}
            />
          </Routes>
        </BrowserRouter>
        <footer>
          <p>
            Created with <span className='heart'>&hearts;</span> by Ole, Axel,
            Eva and Isabelle
          </p>
        </footer>
      </ApolloProvider>
    </div>
  );
}

export default App;

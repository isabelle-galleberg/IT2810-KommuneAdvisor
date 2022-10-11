import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import MainPage from './pages/MainPage/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<MainPage />}
        />
      </Routes>
      <Routes>
        <Route
          path='/kommune'
          element={<DetailsPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

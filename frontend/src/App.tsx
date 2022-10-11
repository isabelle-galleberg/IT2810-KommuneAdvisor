import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import MainPage from './pages/MainPage/MainPage';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div>
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
            path='/kommune'
            element={<DetailsPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import MainPage from './pages/MainPage/MainPage';
import Navbar from './components/Navbar/Navbar';
import ReviewPage from './pages/ReviewPage/ReviewPage';

function App() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className='content'>
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
          {/* The following should be removed, for testing purposes only */}
          <Routes>
            <Route
              path='/review'
              element={<ReviewPage />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

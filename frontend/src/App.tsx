import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage/MainPage';
import Navbar from './components/Navbar/Navbar';
import KommuneDetails from './components/KommuneDetails/KommuneDetails';

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
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

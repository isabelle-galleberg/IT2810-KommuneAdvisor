import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage/MainPage';
import Navbar from './components/Navbar/Navbar';
import DetailsPage from './pages/DetailsPage/DetailsPage';

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
            path='kommune/:kommuneSlug'
            element={<DetailsPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

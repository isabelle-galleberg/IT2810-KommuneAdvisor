import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage/MainPage';
import Navbar from './components/Navbar/Navbar';
import KommuneDetails from './components/KommuneDetails/KommuneDetails';

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
            element={<KommuneDetails />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

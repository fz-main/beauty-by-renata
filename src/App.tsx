import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminPage } from './pages/admin';
import MainPage from './MainPage';

function App() {
  return (
    <BrowserRouter basename="/beauty-by-renata">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


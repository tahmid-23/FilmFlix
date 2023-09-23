import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import HomePage from './pages/HomePage';
import MainNav from './components/MainNav';
import Auth0ProviderWithNavigate from './Auth0ProviderWithNavigate';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Auth0ProviderWithNavigate>
          <Routes>
            <Route path="/">
              <Route index element={<HomePage />} />
              <Route path="diet" element={<></>} />
            </Route>
          </Routes>
        </Auth0ProviderWithNavigate>
      </BrowserRouter>
    </>
  );
};

export default App;

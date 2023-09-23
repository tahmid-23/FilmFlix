import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Auth0ProviderWithNavigate from './Auth0ProviderWithNavigate';
import Feed from './pages/Feed';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Auth0ProviderWithNavigate>
          <Routes>
            <Route path="/">
              <Route index element={<LandingPage />} />
              <Route path="feed" element={<Feed></Feed>} />
            </Route>
          </Routes>
        </Auth0ProviderWithNavigate>
      </BrowserRouter>
    </>
  );
};

export default App;

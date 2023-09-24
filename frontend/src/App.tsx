import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Auth0ProviderWithNavigate from './Auth0ProviderWithNavigate';
import Feed from './pages/Feed';
import Friends from './pages/Friends';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Review from './pages/Review';
import WatchList from './pages/WatchList';
import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <Container
          style={{
            paddingLeft: 0,
            paddingRight: 0,
            width: '100vw',
            minHeight: '100vh',
            overflow: 'scroll'
          }}
          fluid
        >
          <Routes>
            <Route path="/">
              <Route index element={<LandingPage />} />
              <Route path="feed" element={<Feed />} />
              <Route path="friends" element={<Friends />} />
              <Route path="profile/:id" element={<Profile />} />
              <Route path="search" element={<Search />} />
              <Route path="review" element={<Review />} />
              <Route path="watch-list" element={<WatchList />} />
            </Route>
          </Routes>
        </Container>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  );
};

export default App;

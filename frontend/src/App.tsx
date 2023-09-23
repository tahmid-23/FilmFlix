import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import HomePage from './pages/HomePage';
import MainNav from './components/MainNav';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="diet" element={<></>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

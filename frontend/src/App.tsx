import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Container } from 'react-bootstrap';
import HomePage from './pages/HomePage';
import MainNav from './components/MainNav';

const App = () => {
  return (
    <Container
      style={{
        width: '100vw',
        height: '53vw',
        border: '5px solid green',
        backgroundColor: 'black',
        margin: 0
      }}
      fluid
    >
      <MainNav></MainNav>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="diet" element={<></>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default App;

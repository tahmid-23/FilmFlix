import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import {Container} from 'react-bootstrap'
import HomePage from './pages/HomePage';
import MainNav from './components/MainNav';

const App = () => {

  return (
    <>
    <Container>
      <MainNav></MainNav>
      <HomePage></HomePage>
    </Container>

    </>
  );
};

export default App;

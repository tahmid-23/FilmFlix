import { Container } from 'react-bootstrap';
import MainNav from '../components/MainNav';
import SearchBar from '../components/SearchBar';

export default function Search() {
  return (
    <Container
      fluid
      style={{
        paddingLeft: '0',
        paddingRight: '0'
      }}
    >
      <MainNav page="Search" />
      <SearchBar />
    </Container>
  );
}

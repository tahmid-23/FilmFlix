import { Container } from 'react-bootstrap';
import '../main.css';
import MainNav from '../components/MainNav';
import FeedBox from '../components/FeedBox';

// Add typing for props when necessary
export default function Feed({ props }: any) {
  return (
    <>
      <Container fluid>
        <MainNav page="Feed"></MainNav>

        <h1>Friend Feed</h1>
        <FeedBox />
      </Container>
    </>
  );
}

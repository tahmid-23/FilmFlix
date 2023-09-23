import { Container } from 'react-bootstrap';
import MainNav from '../components/MainNav';
import FeedBox from '../components/FeedBox';

// Add typing for props when necessary
export default function Feed({ props }: any) {
  return (
    <>
      <Container fluid>
        <MainNav page="Feed"></MainNav>

        <p>THIS IS THE FEED</p>
      </Container>
      <FeedBox />
    </>
  );
}

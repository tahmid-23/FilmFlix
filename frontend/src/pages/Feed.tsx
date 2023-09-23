import { Container } from 'react-bootstrap';
import MainNav from '../components/MainNav';
import FeedBox from '../components/FeedBox';

// Add typing for props when necessary
export default function Feed({ props }: any) {
  return (
    <>
      <Container fluid>
        <MainNav page="Feed"></MainNav>
        <Container>
          <h1 style={{ marginTop: '10px' }}>
            <b>Friend Feed</b>
          </h1>
          <FeedBox />
        </Container>
      </Container>
    </>
  );
}

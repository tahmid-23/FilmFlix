import { Container } from 'react-bootstrap';
import MainNav from '../components/MainNav';
import FeedBox from '../components/FeedBox';

// Add typing for props when necessary
export default function Feed({ props }: any) {
  return (
    <>
      <Container fluid>
        <MainNav page="Feed"></MainNav>1<h1>Friend Feed</h1>
        <FeedBox />
      </Container>
    </>
  );
}

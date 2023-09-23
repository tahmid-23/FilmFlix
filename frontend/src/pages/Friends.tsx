import { Container } from 'react-bootstrap';
import '../main.css';
import MainNav from '../components/MainNav';
import FeedBox from '../components/FeedBox';

// Add typing for props when necessary
export default function Friends({ props }: any) {
  return (
    <>
      <Container fluid>
        <MainNav page="Friends"></MainNav>
        <FeedBox />
      </Container>
    </>
  );
}

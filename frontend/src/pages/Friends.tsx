import { Container } from 'react-bootstrap';
import '../main.css';
import MainNav from '../components/MainNav';
import FriendPopup from '../components/FriendPopup';

// Add typing for props when necessary
export default function Friends({ props }: any) {
  return (
    <>
      <Container fluid>
        <MainNav page="Friends"></MainNav>
        <FriendPopup />
      </Container>
    </>
  );
}

import { Container } from 'react-bootstrap';
import MainNav from '../components/MainNav';
import FriendPopup from '../components/FriendPopup';

// Add typing for props when necessary
export default function Friends({ props }: any) {
  return (
    <>
      <Container
        className=""
        style={{
          width: '100vw',
          height: '53vw',
          backgroundColor: 'black',
          margin: 0
        }}
        fluid
      >
        <MainNav page="Friends"></MainNav>
        <FriendPopup />
      </Container>
    </>
  );
}
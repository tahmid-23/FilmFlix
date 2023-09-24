import { Container, Button } from 'react-bootstrap';
import '../main.css';

import MainNav from '../components/MainNav';
import FriendPopup from '../components/FriendPopup';
import { useState } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';

export default function Friends({ props }: any) {
  const [show, setShowPopup] = useState(false);

  return (
    <Container
      fluid
      style={{
        paddingLeft: '0',
        paddingRight: '0'
      }}
    >
      <MainNav page="Friends" />
      <div style={{ display: 'flex', marginTop: '12vh', marginLeft: '10vw' }}>
        <h1 style={{ fontSize: 70, color: 'white', marginRight: '3vw' }}>
          Friends
        </h1>
        <Button onClick={() => setShowPopup(true)}>
          <AiOutlineUserAdd size={40} />
        </Button>
        <FriendPopup show={show} setVisible={setShowPopup} />
      </div>
    </Container>
  );
}

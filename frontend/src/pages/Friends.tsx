import { Container, Button } from 'react-bootstrap';
import '../main.css';

import MainNav from '../components/MainNav';
import FriendPopup from '../components/FriendPopup';
import { useState, useEffect, useCallback } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { getFriends } from '../api/api';
import { useAuth0 } from '@auth0/auth0-react';
import ProfileCard from '../components/ProfileCard';
import { Link } from 'react-router-dom';

export default function Friends() {
  const [show, setShowPopup] = useState(false);

  const [listOfFriends, setFriends] = useState([]);

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const refreshFriends = useCallback(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then(getFriends).then(setFriends);
    }
  }, [isAuthenticated, getAccessTokenSilently, setFriends]);

  useEffect(() => {
    refreshFriends();
  }, [refreshFriends]);

  if (!listOfFriends) {
    return <p>Loading...</p>;
  }

  let friendCards = listOfFriends.map((friend: any) => {
    return (
      <ProfileCard
        key={friend.account_id}
        name={
          <Link
            to={`/profile/${friend.account_id}`}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            {friend.name}
          </Link>
        }
        email={friend.email}
        bio={friend.bio}
      ></ProfileCard>
    );
  });

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
        <FriendPopup
          show={show}
          setVisible={setShowPopup}
          onAddFriend={refreshFriends}
        />
      </div>

      {friendCards}
    </Container>
  );
}

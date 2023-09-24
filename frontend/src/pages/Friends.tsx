import { Button, Stack } from 'react-bootstrap';
import '../main.css';

import MainNav from '../components/MainNav';
import FriendPopup from '../components/FriendPopup';
import { useState, useEffect, useCallback, ReactNode } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { getFriends } from '../api/api';
import { useAuth0 } from '@auth0/auth0-react';
import ProfileCard from '../components/ProfileCard';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { useRedirectUnauthenticated } from '../hooks/useRedirectUnauthenticated';

export default function Friends() {
  useRedirectUnauthenticated();
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

  let content: ReactNode;
  if (!listOfFriends) {
    content = <Loading />;
  } else {
    content = (
      <>
        <div style={{ display: 'flex' }}>
          <Stack direction="horizontal" gap={2}>
            <h1 style={{ fontSize: '25 rem' }}>
              <b>Friends {`(${listOfFriends.length})`}</b>
            </h1>
            <Button onClick={() => setShowPopup(true)}>
              <AiOutlineUserAdd size={35} />
            </Button>
          </Stack>

          <div style={{ paddingTop: '2em' }}>
            <FriendPopup
              show={show}
              setVisible={setShowPopup}
              onAddFriend={refreshFriends}
            />
          </div>
        </div>
        {listOfFriends.map((friend: any) => {
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
            />
          );
        })}
      </>
    );
  }

  return (
    <>
      <MainNav page="Friends" />
      <div style={{ padding: '2vh 2vw' }}>{content}</div>
    </>
  );
}

import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Stack } from 'react-bootstrap';
import ProfileCard from '../components/ProfileCard';
import { getProfile } from '../api/api';

const Profile = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const { id } = useParams();
  const [profileJson, setProfileJson] = useState<any>();

  useEffect(() => {
    if (isAuthenticated && !isNaN(Number(id))) {
      getAccessTokenSilently()
        .then((token) => getProfile(Number(id), token))
        .then(setProfileJson);
    }
  }, [getAccessTokenSilently, isAuthenticated, id]);

  if (!profileJson) {
    return 'Loading...';
  }

  return (
    <Stack>
      <ProfileCard
        name={profileJson.name}
        email="sample@gmail.com"
        bio={profileJson.bio}
      />
    </Stack>
  );
};

export default Profile;

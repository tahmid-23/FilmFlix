import { Button, Stack } from 'react-bootstrap';
import MainNav from '../components/MainNav';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  if (isAuthenticated) {
    navigate('/feed');
  }

  return (
    <>
      <MainNav page="LandingPage" />
      <Stack style={{ alignItems: 'center', padding: '2vh 2vw' }} gap={1}>
        <h2
          style={{
            color: 'white',
            textAlign: 'center',
            width: '50%',
            marginTop: '3vh'
          }}
        >
          See what movies your friends are watching, connect with a vibrant
          community of film lovers - Join FilmFlix today!
        </h2>
        <Button
          variant="primary"
          size="lg"
          style={{ marginTop: '3vh' }}
          onClick={() => loginWithRedirect()}
        >
          Create an Account!
        </Button>
      </Stack>
    </>
  );
}

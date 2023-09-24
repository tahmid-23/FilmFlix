import { Button, Container, Stack } from 'react-bootstrap';
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
      <Container
        fluid
        style={{
          paddingLeft: '0',
          paddingRight: '0'
        }}
      >
        <MainNav page="LandingPage" />
        <Stack style={{ alignItems: 'center', marginTop: '10vh' }} gap={1}>
          <h2 style={{ color: 'white', textAlign: 'center', width: '50%' }}>
            See what movies your friends are watching, connect with a vibrant
            community of film lovers - Join FilmFlix today!
          </h2>
          <Button variant="primary" onClick={() => loginWithRedirect()}>
            Create an Account!
          </Button>
        </Stack>
      </Container>
    </>
  );
}

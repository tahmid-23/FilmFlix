import { Container } from 'react-bootstrap';
import MainNav from '../components/MainNav';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

// Add typing for props when necessary
export default function LandingPage({ props }: any) {
  const { isAuthenticated } = useAuth0();
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
        <MainNav page="LandingPage"></MainNav>
      </Container>
    </>
  );
}

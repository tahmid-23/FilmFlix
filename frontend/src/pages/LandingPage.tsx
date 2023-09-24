import { Container } from 'react-bootstrap';
import MainNav from '../components/MainNav';

// Add typing for props when necessary
export default function LandingPage({ props }: any) {
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

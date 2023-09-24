import { Container } from 'react-bootstrap';

import MainNav from '../components/MainNav';
import FeedBox from '../components/FeedBox';
import ProfileCard from '../components/ProfileCard';

// Add typing for props when necessary
export default function Feed({ props }: any) {
  return (
    <>
      <Container
        fluid
        style={{
          paddingLeft: '0',
          paddingRight: '0'
        }}
      >
        <MainNav page="Feed"></MainNav>
        <Container>
          <h1 style={{ marginTop: '10px', color: 'white' }}>
            <b>Friend Feed</b>
          </h1>
          <FeedBox />
          <ProfileCard
            name="John Doe"
            email="johndoe@example.com"
            bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu semper turpis, vitae tempus erat."
          />
        </Container>
      </Container>
    </>
  );
}

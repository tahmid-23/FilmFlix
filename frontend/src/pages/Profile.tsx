import { useAuth0 } from '@auth0/auth0-react';
import { ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import { getProfile } from '../api/api';
import {
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
  Stack
} from 'react-bootstrap';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

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

  let reviews;
  if (profileJson.reviews && profileJson.reviews.length !== 0) {
    reviews = (
      <ListGroup>
        {profileJson.reviews.map((review: any) => {
          let stars: ReactNode[] = [];
          for (let i = 0; i < review.rating; ++i) {
            stars.push(<AiFillStar key={i} />);
          }
          for (let i = review.rating; i < 5; ++i) {
            stars.push(<AiOutlineStar key={i} />);
          }

          return (
            <ListGroupItem key={review.review_id}>
              <Stack gap={1}>
                <div>
                  <h5 style={{ margin: 0 }}>
                    <span>{review.movie_title}</span> {stars}
                  </h5>
                  <h6 style={{ margin: 0 }}>
                    <i>
                      Reviewed on{' '}
                      {new Date(1000 * review.timestamp).toDateString()}
                    </i>
                  </h6>
                </div>
                <p style={{ margin: 0 }}>{review.description}</p>
              </Stack>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    );
  } else {
    reviews = <Card.Text>{profileJson.name} has no reviews.</Card.Text>;
  }

  let watchList;
  if (profileJson.watchList && profileJson.watchList.length !== 0) {
    watchList = (
      <ListGroup>
        {profileJson.watchList.map((movie: any) => {
          return (
            <ListGroupItem key={movie.planned_movie_id}>
              <h5 style={{ margin: 0 }}>{movie.movie_title}</h5>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    );
  } else {
    watchList = (
      <Card.Text>{profileJson.name} has nothing on their watch list.</Card.Text>
    );
  }

  return (
    <Container style={{ padding: '1vh 1vw' }} fluid>
      <Row style={{ height: '40%' }}>
        <ProfileCard
          name={profileJson.name}
          email="sample@gmail.com"
          bio={profileJson.bio}
        />
      </Row>
      <Row style={{ height: '60%' }}>
        <Col>
          <Card style={{ height: '100%' }}>
            <Card.Header>Reviews</Card.Header>
            <Card.Body>{reviews}</Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ height: '100%' }}>
            <Card.Header>Watching Soon</Card.Header>
            <Card.Body>{watchList}</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;

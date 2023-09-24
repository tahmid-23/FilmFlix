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
import MainNav from '../components/MainNav';
import Loading from '../components/Loading';
import { useRedirectUnauthenticated } from '../hooks/useRedirectUnauthenticated';

const Profile = () => {
  useRedirectUnauthenticated();
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

  let content: ReactNode;
  if (!profileJson) {
    content = <Loading />;
  } else {
    let reviews;
    if (profileJson.reviews && profileJson.reviews.length !== 0) {
      reviews = (
        <ListGroup>
          {profileJson.reviews.map((review: any) => {
            const stars: ReactNode[] = [];
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
                        {new Date(1000 * review.timestamp).toLocaleDateString(
                          'en-US',
                          { timeZone: 'UTC' }
                        )}
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
                <h6 style={{ margin: 0 }}>
                  <i>
                    Planning to watch on{' '}
                    {new Date(1000 * movie.watch_at).toLocaleDateString(
                      'en-US',
                      {
                        timeZone: 'UTC'
                      }
                    )}
                  </i>
                </h6>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      );
    } else {
      watchList = (
        <Card.Text>
          {profileJson.name} has nothing on their watch list.
        </Card.Text>
      );
    }

    content = (
      <>
        <Container style={{ marginLeft: 0 }}>
          <ProfileCard
            name={profileJson.name}
            email={profileJson.email}
            bio={profileJson.bio}
          />
        </Container>
        <Container fluid>
          <Row style={{ height: '60%', width: '100vw' }}>
            {' '}
            <Col>
              <Card style={{ height: '100%' }}>
                <Card.Header>
                  <h4>
                    <b>Reviews</b>
                  </h4>
                </Card.Header>
                <Card.Body>{reviews}</Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ height: '100%' }}>
                <Card.Header>
                  <h4>
                    <b>Watching Soon</b>
                  </h4>
                </Card.Header>
                <Card.Body>{watchList}</Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  return (
    <Container
      style={{ paddingLeft: 0, paddingRight: 0, overflow: 'hidden' }}
      fluid
    >
      <MainNav page="Profile" />
      {content}
    </Container>
  );
};

export default Profile;

import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import MainNav from '../components/MainNav';
import { FormEvent, ReactNode, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { addReview, getOwnId } from '../api/api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { useRedirectUnauthenticated } from '../hooks/useRedirectUnauthenticated';

const Review = () => {
  useRedirectUnauthenticated();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState<string>();
  const [ownId, setOwnId] = useState();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((token) => {
        getOwnId(token).then(setOwnId);
        setAccessToken(token);
      });
    }
  }, [isAuthenticated, getAccessTokenSilently, setAccessToken, setOwnId]);

  let content: ReactNode;
  if (!accessToken || !ownId) {
    content = <Loading />;
  } else {
    content = (
      <Form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget);
          const title = formData.get('title')!.toString();
          const rating = Number(formData.get('rating')!.toString());
          const description = formData.get('description')!.toString();

          addReview(title, rating, description, accessToken).then(() => {
            navigate(`/profile/${ownId}`);
          });
        }}
      >
        <Container style={{ paddingTop: '8px' }}>
          <Row>
            <Col className="col-2" />
            <Col className="col-10">
              <h1 style={{ textAlign: 'center', color: 'white' }}>
                Movie Review
              </h1>
            </Col>
          </Row>
          <div className="form-group row" style={{ marginBottom: '15px' }}>
            <Col className="col-2">
              <Form.Label style={{ color: 'white' }}>Movie Title:</Form.Label>
            </Col>
            <Col className="col-10">
              <Form.Control
                name="title"
                type="text"
                placeholder="Enter movie title"
                defaultValue={params.get('title') || undefined}
              />
            </Col>
          </div>
          <div className="form-group row" style={{ marginBottom: '15px' }}>
            <Col className="col-2">
              <Form.Label style={{ color: 'white' }}>Rating:</Form.Label>
            </Col>
            <Col className="col-10">
              <Form.Control
                name="rating"
                type="text"
                placeholder="Enter rating"
                pattern="[1-5]"
              />
            </Col>
          </div>
          <div className="form-group row" style={{ marginBottom: '15px' }}>
            <Col className="col-2">
              <Form.Label style={{ color: 'white' }}>Comments:</Form.Label>
            </Col>
            <Col className="col-10">
              <Form.Control
                name="description"
                as="textarea"
                rows={3}
                placeholder="Comments"
              />
            </Col>
          </div>
          <Row style={{ justifyContent: 'flex-end', paddingRight: '10px' }}>
            <Button type="submit" style={{ width: '200px', marginRight: '0' }}>
              Submit
            </Button>
          </Row>
        </Container>
      </Form>
    );
  }

  return (
    <Container
      fluid
      style={{
        paddingLeft: '0',
        paddingRight: '0',
        paddingBottom: '15'
      }}
    >
      <MainNav page="Review" />
      {content}
    </Container>
  );
};

export default Review;

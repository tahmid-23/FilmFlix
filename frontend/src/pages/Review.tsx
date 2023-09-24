import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import MainNav from '../components/MainNav';
import { FormEvent, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { addReview } from '../api/api';

interface ReviewProps {
  title?: string;
}

const Review = ({ title }: ReviewProps) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then(setAccessToken);
    }
  }, [isAuthenticated]);

  if (!accessToken) {
    return <>Loading...</>;
  }

  return (
    <Container
      fluid
      style={{
        paddingLeft: '0',
        paddingRight: '0'
      }}
    >
      <MainNav page="LandingPage" />
      <Form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget);
          const title = formData.get('title')!.toString();
          const rating = Number(formData.get('rating')!.toString());
          const description = formData.get('description')!.toString();

          addReview(title, rating, description, accessToken);
        }}
      >
        <Container>
          <Row>
            <h1 style={{ textAlign: 'center', color: 'white' }}>
              Movie Review
            </h1>
          </Row>
          <div className="form-group row">
            <Col className="col-2">
              <Form.Label style={{ color: 'white' }}>Movie Title:</Form.Label>
            </Col>
            <Col className="col-10">
              <Form.Control
                name="title"
                type="text"
                placeholder="Enter movie title"
                defaultValue={title}
              />
            </Col>
          </div>
          <div className="form-group row">
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
          <div className="form-group row">
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
          <Row style={{ flexBasis: '0' }}>
            <Button type="submit">Submit</Button>
          </Row>
        </Container>
      </Form>
    </Container>
  );
};

export default Review;

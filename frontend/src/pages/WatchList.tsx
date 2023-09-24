import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import MainNav from '../components/MainNav';
import { FormEvent, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { addWatchList, getOwnId } from '../api/api';
import { useNavigate, useSearchParams } from 'react-router-dom';

const WatchList = () => {
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
  }, [getAccessTokenSilently, isAuthenticated]);

  if (!accessToken || !ownId) {
    return <>Loading...</>;
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
      <Form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget);
          const title = formData.get('title')!.toString();
          const watchAt = formData.get('watchAt')!.toString();

          addWatchList(title, Date.parse(watchAt) / 1000, accessToken).then(
            () => {
              navigate(`/profile/${ownId}`);
            }
          );
        }}
      >
        <Container style={{ paddingTop: '8px' }}>
          <Row>
            <Col className="col-2"></Col>
            <Col className="col-10">
              <h1 style={{ textAlign: 'center', color: 'white' }}>
                Add to Watchlist
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
              <Form.Label style={{ color: 'white' }}>Planned Date:</Form.Label>
            </Col>
            <Col className="col-10">
              <Form.Control name="watchAt" type="date" />
            </Col>
          </div>
          <Row style={{ justifyContent: 'flex-end', paddingRight: '10px' }}>
            <Button type="submit" style={{ width: '200px', marginRight: '0' }}>
              Submit
            </Button>
          </Row>
        </Container>
      </Form>
    </Container>
  );
};

export default WatchList;

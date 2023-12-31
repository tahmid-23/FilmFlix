import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import MainNav from '../components/MainNav';
import { FormEvent, ReactNode, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { addWatchList, getOwnId } from '../api/api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { useRedirectUnauthenticated } from '../hooks/useRedirectUnauthenticated';

const WatchList = () => {
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
  }, [getAccessTokenSilently, isAuthenticated]);

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
          const watchAt = formData.get('watchAt')!.toString();

          addWatchList(title, Date.parse(watchAt) / 1000, accessToken).then(
            () => {
              navigate(`/profile/${ownId}`);
            }
          );
        }}
      >
        <Container>
          <Row>
            <Col className="col-2" />
            <Col className="col-10">
              <h1 style={{ textAlign: 'center' }}>Add to Watchlist</h1>
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
    );
  }

  return (
    <>
      <MainNav page="Review" />
      <div style={{ padding: '2vh 2vw' }}>{content}</div>
    </>
  );
};

export default WatchList;

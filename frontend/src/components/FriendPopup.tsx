import React, { FormEvent, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth0 } from '@auth0/auth0-react';
import { addFriend } from '../api/api';

interface FriendPopupInput {
  setVisible: Function;
  show: boolean;
}
export default function FriendPopup({ show, setVisible }: FriendPopupInput) {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState<string>();


  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then(setAccessToken);
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  if (!accessToken) {
    return <>Loading...</>;
  }

  return (
    <div className="text-center">
      <Modal
        show={show}
        onHide={() => {
          setVisible(false);
        }}
        centered
      >
        <Form.Group controlId="formUsername">
          <Form
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();

              const formData = new FormData(e.currentTarget);

              const username = formData.get('email')!.toString();

              addFriend(username, accessToken).then(setVisible(false));
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add a friend:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Label>Enter an email</Form.Label>
              <Form.Control type="text" placeholder="Email" name="email" />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setVisible(false)}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Add
              </Button>
            </Modal.Footer>
          </Form>
        </Form.Group>
      </Modal>
    </div>
  );
}

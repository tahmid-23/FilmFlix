import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface FriendPopupInput {
  setVisible: Function, 
  show: boolean
}
export default function FriendPopup({show, setVisible} : FriendPopupInput) {

  console.log(show); 

  return (
    <div className="text-center">

      <Modal show={show} onHide={()=> {setVisible(false)}} centered>
        <Modal.Header closeButton>
          <Modal.Title>Search for a user:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Enter a username</Form.Label>
              <Form.Control type="text" placeholder="Username" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setVisible(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>alert("Code this")}>
            Search
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
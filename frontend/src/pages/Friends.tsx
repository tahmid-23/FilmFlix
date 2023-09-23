import { Container, Row, Col, Button} from 'react-bootstrap';
import '../main.css';
import MainNav from '../components/MainNav';
import FriendPopup from '../components/FriendPopup';
import { useState } from 'react';

import {AiOutlineUserAdd} from 'react-icons/ai'
import ProfileCard from '../components/ProfileCard';

export default function Friends({ props }: any) {


  let [show, showPopup] = useState(false); 

  return (
    <>
      <Container fluid>
        <MainNav page="Friends"></MainNav>


          <div style={{display:"flex", marginTop: "12vh", marginLeft:"10vw"}}>
             <h1 style={{fontSize:70, color:"white", marginRight:"3vw"}}>
              Friends
            </h1>
            <Button onClick={() => {showPopup(true)}}>
                <AiOutlineUserAdd size={40}></AiOutlineUserAdd>
            </Button>

            <FriendPopup show={show} setVisible={showPopup}></FriendPopup>
          </div>
          
      </Container>


    </>
  );
}

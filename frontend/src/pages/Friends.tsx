import { Container, Row, Col, Button} from 'react-bootstrap';
import '../main.css';
import MainNav from '../components/MainNav';

import {AiOutlineUserAdd} from 'react-icons/ai'
// Add typing for props when necessary
export default function Friends({ props }: any) {
  return (
    <>
      <Container fluid>
        <MainNav page="Friends"></MainNav>


          <div style={{display:"flex", marginTop: "12vh", marginLeft:"10vw"}}>
             <h1 style={{fontSize:70, color:"white", marginRight:"3vw"}}>
              Friends
            </h1>
            <Button>
                <AiOutlineUserAdd size={40}></AiOutlineUserAdd>
            </Button>
          </div>
      </Container>
    </>
  );
}

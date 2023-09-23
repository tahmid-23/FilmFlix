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
        <Container>

          <Row style={{marginTop: "10vw"}} className="d-flex align-items-center" >
            <Col xs lg = {5}>
              <h1 style={{fontSize:70, color:"white"}}>
                Friends
              </h1>
            </Col>

            <Col xs lg = {1}>
            <Button>
              <AiOutlineUserAdd backgroundColor="black"></AiOutlineUserAdd>
            </Button>
            </Col>

            <Col xs lg = {6}>
            </Col>
            

          </Row>

        </Container>
      </Container>
    </>
  );
}

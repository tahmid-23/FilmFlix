import { Container, Row, Col, Button} from 'react-bootstrap';
import '../main.css';
import MainNav from '../components/MainNav';
import FeedBox from '../components/FeedBox';

import {AiOutlineUserAdd} from 'react-icons/ai'
// Add typing for props when necessary
export default function Friends({ props }: any) {
  return (
    <>
      <Container fluid>
        <MainNav page="Friends"></MainNav>
        <FeedBox />
      </Container>
    </>
  );
}

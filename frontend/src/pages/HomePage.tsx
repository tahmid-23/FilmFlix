import {Container, Row, Col, Button} from 'react-bootstrap'
import MainNav from '../components/MainNav'



// Add typing for props when necessary
export default function HomePage({props}: any) {

    return (
        <>

        <Container
            className=""
            style={{
            width: '100vw',
            height: '53vw',
            backgroundColor: 'black',
            margin: 0
        }}
        fluid> 
        
            <MainNav page="HomePage"></MainNav>
        </Container>
        </>
    )
}
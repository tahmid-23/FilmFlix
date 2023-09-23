import {Navbar, Container, Nav} from 'react-bootstrap'

// add specific typing with interface if necessary

export default function MainNav({props}: any) {

    return (

        // Change font to match the outline
        <>
        <Navbar data-bs-theme="dark" style={{background: "#3E3E3E", fontSize:25}}>
            <Container style={{width: window.screen.width, height: 40}}>
                <Navbar.Brand href="./" style={{paddingRight: 40, fontSize:45, fontFamily: 'Koulen'}}> FilmFlix</Navbar.Brand>
                <Nav variant="tabs" className="me-auto"
                 style={{fontFamily: "Ubuntu", lineHeight: "133.023%", fontWeight: 400, fontStyle: "normal"}}>
                    <Nav.Link href="./diet" style={{paddingRight: 20}} >Sign-up</Nav.Link>
                    <Nav.Link href="./arms" style={{paddingRight: 20}}>Log-in</Nav.Link>
                    
                </Nav>
            </Container>
        </Navbar>
        </>

    )

}
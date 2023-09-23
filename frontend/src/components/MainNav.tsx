import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';

import { useAuth0 } from '@auth0/auth0-react';
// add specific typing with interface if necessary

interface Page {
  page: string;
}

function BasicLink({ tab }: { tab: string }) {
  return (
    <Nav.Link href={'./' + tab} style={{ paddingRight: 35 }}>
      {tab}
    </Nav.Link>
  );
}

export default function MainNav({ page }: Page) {
  const { loginWithRedirect } = useAuth0();

  let navLinks: any[];
  if (page === 'LandingPage') {
    navLinks = [
      <Nav.Link
        style={{ paddingRight: 35 }}
        onClick={() => loginWithRedirect()}
      >
        Sign Up
      </Nav.Link>,
      <Nav.Link
        style={{ paddingRight: 35 }}
        onClick={() => loginWithRedirect()}
      >
        Log In
      </Nav.Link>
    ];
  } else {
    navLinks = [
      <BasicLink tab="Home" />,
      <BasicLink tab="Friends" />,
      <BasicLink tab="Logout" />
    ];
  }

  return (
    // Change font to match the outline
    <>
      <Navbar
        data-bs-theme="dark"
        style={{ background: '#3E3E3E', fontSize: 25 }}
      >
        <Navbar.Brand
          href="./"
          style={{
            fontSize: 45,
            fontFamily: 'Koulen',
            marginRight: 20,
            marginLeft: 60
          }}
        >
          {' '}
          FilmFlix
        </Navbar.Brand>
        <div style={{ width: '70%' }}></div>
        <Nav
          variant="tabs"
          className="me-auto"
          style={{
            fontFamily: 'Ubuntu',
            lineHeight: '133.023%',
            fontWeight: 400,
            fontStyle: 'normal'
          }}
        >
          {navLinks}
        </Nav>
      </Navbar>
    </>
  );
}

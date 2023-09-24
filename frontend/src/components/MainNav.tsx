import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
// add specific typing with interface if necessary

interface Page {
  page: string;
}

function BasicLink({ tab }: { tab: string }) {
  return (
    <Nav.Link href={'./' + tab} style={{ paddingRight: 20, paddingLeft: 20 }}>
      {tab}
    </Nav.Link>
  );
}

const navTabs: Record<string, string[]> = {
  Friends: ['Search', 'Feed', 'Friends', 'Logout'],
  Feed: ['Search', 'Friends', 'Logout']
};

export default function MainNav({ page }: Page) {
  const { loginWithRedirect, logout } = useAuth0();

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
  } else if (page === 'Friends') {
    navLinks = [
      <BasicLink tab="Feed" />,
      <BasicLink tab="Friends" />,
      <Nav.Link style={{ paddingRight: 35 }} onClick={() => logout()}>
        Logout
      </Nav.Link>
    ];
  } else {
    // Feed
    navLinks = [
      <BasicLink tab="Friends" />,
      <Nav.Link style={{ paddingRight: 35 }} onClick={() => logout()}>
        Logout
      </Nav.Link>
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

import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { getOwnId } from '../api/api';
// add specific typing with interface if necessary

interface Page {
  page: string;
}

function BasicLink({ tab }: { tab: string }) {
  return (
    <Nav.Link href={'/' + tab} style={{ paddingRight: 20, paddingLeft: 20 }}>
      {tab}
    </Nav.Link>
  );
}

const navTabs: Record<string, string[]> = {
  Friends: ['Profile', 'Search', 'Feed', 'Logout'],
  Feed: ['Profile', 'Search', 'Friends', 'Logout'],
  Profile: ['Search', 'Feed', 'Friends', 'Logout'],
  Search: ['Profile', 'Feed', 'Friends', 'Logout'],
  Review: ['Profile', 'Search', 'Feed', 'Friends', 'Logout']
};

export default function MainNav({ page }: Page) {
  const { loginWithRedirect, logout, isAuthenticated, getAccessTokenSilently } =
    useAuth0();
  const navigate = useNavigate();

  let navLinks: any[];
  if (page === 'LandingPage') {
    navLinks = [
      <Nav.Link
        style={{ paddingRight: 15, paddingLeft: 15 }}
        onClick={() => loginWithRedirect()}
      >
        Sign Up
      </Nav.Link>,
      <Nav.Link
        style={{ paddingRight: 15, paddingLeft: 15 }}
        onClick={() => loginWithRedirect()}
      >
        Log In
      </Nav.Link>
    ];
  } else {
    navLinks = navTabs[page].map((tab: string) => {
      if (tab === 'Logout') {
        return (
          <Nav.Link
            style={{ paddingRight: 15, paddingLeft: 15 }}
            onClick={() => logout()}
          >
            Logout
          </Nav.Link>
        );
      } else if (tab === 'Profile') {
        return (
          <Nav.Link
            style={{ paddingRight: 20, paddingLeft: 20 }}
            onClick={() => {
              if (isAuthenticated) {
                getAccessTokenSilently()
                  .then(getOwnId)
                  .then((id) => {
                    navigate(`/profile/${id}`);
                  });
              }
            }}
          >
            Profile
          </Nav.Link>
        );
      }
      return <BasicLink tab={tab} />;
    });

    // Feed
  }

  return (
    // Change font to match the outline
    <>
      <Navbar
        data-bs-theme="dark"
        style={{ background: '#3E3E3E', fontSize: 25 }}
      >
        <Navbar.Brand
          href="/"
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
            fontStyle: 'normal',
            border: 0
          }}
        >
          {navLinks}
        </Nav>
      </Navbar>
    </>
  );
}

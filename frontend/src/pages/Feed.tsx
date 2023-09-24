import { Container } from 'react-bootstrap';

import MainNav from '../components/MainNav';
import FeedBox from '../components/FeedBox';
import { useAuth0 } from '@auth0/auth0-react';
import { ReactNode, useEffect, useState } from 'react';
import { getFeed } from '../api/api';
import Loading from '../components/Loading';
import { useRedirectUnauthenticated } from '../hooks/useRedirectUnauthenticated';

export default function Feed() {
  useRedirectUnauthenticated();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [feed, setFeed] = useState<any>();

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then(getFeed).then(setFeed);
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  let content: ReactNode;
  if (!feed) {
    content = <Loading />;
  } else {
    const entries = [];
    for (const friend of feed) {
      for (const review of friend.reviews) {
        entries.push({ name: friend.name, feed_type: 'REVIEW', ...review });
      }
      for (const movie of friend.watchList) {
        entries.push({ name: friend.name, feed_type: 'WATCH_LIST', ...movie });
      }
    }
    entries.sort((entryA, entryB) => entryB.timestamp - entryA.timestamp);

    content = (
      <Container>
        <h1 style={{ marginTop: '10px', color: 'white' }}>
          <b>Friend Feed</b>
        </h1>
        {entries.map((entry) => {
          return (
            <FeedBox
              key={`${entry.feed_type}${
                entry.feed_type === 'WATCH_LIST'
                  ? entry.planned_movie_id
                  : entry.review_id
              }`}
              title={entry.name}
              subtitle={<b>{entry.movie_title}</b>}
              info={`${
                entry.feed_type === 'WATCH_LIST'
                  ? 'Watching soon'
                  : 'Left a review'
              } · ${new Date(1000 * entry.timestamp).toLocaleDateString(
                'en-US',
                { timeZone: 'UTC' }
              )}`}
            />
          );
        })}
      </Container>
    );
  }

  return (
    <Container
      fluid
      style={{
        paddingLeft: '0',
        paddingRight: '0',
        height: '100%',
        minHeight: '100vh'
      }}
    >
      <MainNav page="Feed" />
      {content}
    </Container>
  );
}

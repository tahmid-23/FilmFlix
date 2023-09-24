import MainNav from '../components/MainNav';
import SearchBar from '../components/SearchBar';
import { useRedirectUnauthenticated } from '../hooks/useRedirectUnauthenticated';

export default function Search() {
  useRedirectUnauthenticated();

  return (
    <>
      <MainNav page="Search" />
      <div style={{ padding: '2vh 2vw' }}>
        <SearchBar />
      </div>
    </>
  );
}

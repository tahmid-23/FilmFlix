import { Container, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import MovieInfo from './MovieInfo';

export default function SearchBar() {
  const [searchInput, setSearch] = useState('');
  const [movieList, setMovieList] = useState([]);
  const movieText = movieList.map((descript: any) => {
    return (
      <MovieInfo
        key={descript.id}
        title={descript.title}
        date={descript.release_date}
        description={descript.overview}
      />
    );
  });

  return (
    <div className="input-group rounded-lg">
      <Container className="justify-content-center">
        <Row className="justify-content-center" style={{ paddingTop: '25px' }}>
          <Col className="col-8">
            <input
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              type="search"
              className="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
            />
          </Col>
          <Col className="col-2" style={{ width: 'fit-content' }}>
            <Button
              onClick={() => {
                testApi(searchInput);
              }}
            >
              Submit
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>{movieText}</Col>
        </Row>
      </Container>
    </div>
  );
  async function testApi(title: string) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWMxMDU2Y2UyYmMwMmRjOGU0OWY5NTQzYjU0MjRkMCIsInN1YiI6IjY1MGZiMDE5MDljMjRjMDBlMmVhOTMyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4ZlD7cWUhr2ey7D9_W98MHaJqwWUdc-4JPp_Ey0L55U'
      }
    };

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=/${title}&include_adult=true&language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setMovieList(response.results))
      .catch((err) => console.error(err));
  }
}

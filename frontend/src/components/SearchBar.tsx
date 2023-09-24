import { Container, Row, Col, Button} from "react-bootstrap";

export default function SearchBar() {
  
  return (
    <div className="input-group rounded">

      <Container className="justify-content-center">
        <Row>
          <Col xs lg = {8}>
          <input onSubmit={(e)=> console.log(e)}
          type="search"
          className="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
        />
          </Col>
          <Col xs lg = {4}>
            <Button>Submit</Button>
          </Col>
        </Row>
       

        

      </Container>
      

    
    </div>
  );
}

async function testApi() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWMxMDU2Y2UyYmMwMmRjOGU0OWY5NTQzYjU0MjRkMCIsInN1YiI6IjY1MGZiMDE5MDljMjRjMDBlMmVhOTMyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4ZlD7cWUhr2ey7D9_W98MHaJqwWUdc-4JPp_Ey0L55U'
    }
  };
  
  fetch('https://api.themoviedb.org/3/search/movie?query=Mulan&include_adult=false&language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
};
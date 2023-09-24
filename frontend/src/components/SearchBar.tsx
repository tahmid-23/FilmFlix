import { Container, Row, Col, Button} from "react-bootstrap";
import { useState } from "react";

export default function SearchBar() {

  let [searchInput, setSearch] = useState(""); 

  let [movieList, setMovieList] = useState([]); 

  let movieText = movieList.map((descript:any) => {

    console.log(descript); 

    
    return <p color="white" key={descript.id}> {descript.original_title}</p>


  }); 
  
  return (
    <div className="input-group rounded">

      <Container className="justify-content-center">
        <Row>
          <Col xs lg = {8}>
          <input onChange={(e) => {setSearch(e.target.value)}}
          type="search"
          className="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
        />
          </Col>
          <Col xs lg = {4}>
            <Button onClick={()=>{testApi(searchInput)}}>Submit</Button>
          </Col>
        </Row>
        <Row>
          <Col>

          {movieText}


          
          </Col>
        </Row>
      </Container>
      

    
    </div>
  );
  async function testApi(title: string) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWMxMDU2Y2UyYmMwMmRjOGU0OWY5NTQzYjU0MjRkMCIsInN1YiI6IjY1MGZiMDE5MDljMjRjMDBlMmVhOTMyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4ZlD7cWUhr2ey7D9_W98MHaJqwWUdc-4JPp_Ey0L55U'
      }
    };
    
    fetch(`https://api.themoviedb.org/3/search/movie?query=/${title}&include_adult=true&language=en-US&page=1`, options)
      .then(response => response.json())
      .then(response => setMovieList(response.results))
      .catch(err => console.error(err));
  };
}


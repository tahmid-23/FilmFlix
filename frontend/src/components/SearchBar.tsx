export default function SearchBar() {

  testApi(); 
  
  return (
    <div className="input-group rounded">
      <input
        type="search"
        className="form-control rounded"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="search-addon"
      />

    
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
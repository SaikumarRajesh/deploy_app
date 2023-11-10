import {  useEffect, useState } from "react";

import './App.css';
import { backendurl } from "../config.js";

const Movielog = ({ isEdit, data, handlemovielog}) => {
   
  // const [movieName, setMovieName] = useState('');
  // const [movieImage, setMovieImage] = useState('');
  // const [releaseDate, setReleaseDate] = useState('');

  const [formdata, setFormData] = useState({
    Movie_Name: '',
    Movie_Image: '',
    DateOfRelease: ''
  });



  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setFormData({
      ...formdata,
      [name]: value
    });
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formdata);


    
    await fetch(
      `${backendurl}/movies`,
    {
      method:'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(formdata)
    })

    handlemovielog();
  };


  return(
    <div className="moviepage">
      <div className="moviespage">
      
      <form onSubmit={handleSubmit}>
      <h1>Movie Information Form</h1>
      <div>
        <label htmlFor="name">
          Movie Name:
          </label>
          <input
            type="text"
            id="name"
            name="Movie_Name"
            value={formdata. Movie_Name}
            onChange={handleInputChange}
      
          />
     
        </div>
        <div>
        <label htmlFor="imageUrl">
          Movie Image URL:
          </label>
          <input
            type="text"
            id="imageUrl"
            name="Movie_Image"
            value={formdata.Movie_Image}
            onChange={handleInputChange}
          
          />
     
        </div>

        <div>
        <label htmlFor="dor">
          DateOfRelease:
          </label>
          <input
            type="date"
            id="dor"
            name="DateOfRelease"
            value={formdata.DateOfRelease}
            onChange={handleInputChange}    
          />
       
        </div>
        <div style={{alignItems:"center"}}>
        <button type="submit">Submit</button>
        </div>
      </form>
      </div>
    </div>
  )

}

function App() {

  const [showMovielog, setMovielog] = useState(false);
  const [ Film, setmovies] =useState([]);  

  const handlemovielog = () => {
    if (showMovielog) {
      setMovielog(false);
    } else {
      setMovielog(true);
    }
  }

  const fetchmovies = async () => {
    const response = await fetch(`${backendurl}/movies`)
    const data = await response.json();
    setmovies(data)
  }
  useEffect(() => {
    fetchmovies();

  }, [])

  return (
    <>
   <div style={{display:'flex',fontSize:32}}>
    <div style={{flexGrow:1}}>
      List Of Movies
    </div>
    <button onClick={handlemovielog}>
      Add_Movies
    </button>
    </div>
    <div
    style={{
      display:'flex',
      flexWrap:'wrap',
      
      
    }}>
      {Film.map((movie) => (
        <div
        style={{
          border:'1px solid',
          alignItems:"center"

        }}
        key={movie.id}
        >
          <img src={movie.Movie_Image} alt={movie.Movie_Name}  style={{ width:' 100%',
    height: '250px'}}
    />
          <h3>Name:{movie.Movie_Name}</h3>
          <h4>DOR:{movie.DateOfRelease}</h4>
        </div>
      ))}
    </div>
  

  {showMovielog && <Movielog  handlemovielog={handlemovielog}/>}
  </>
  )
}

export default App

import { useState, useEffect } from 'react';
import { handleSearch } from '../functions/CourseFunctions';
import "../styles/searchbar.css"
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';

export const SearchBar = (props) => {
  const [searchText, setSearchText] = useState('');
  const [dbCourses, setDbCourses] = useState([]);
  const axios = props.axiosInstance;
  const courses = props.onCoursesUpdated

  const fetchDatabaseCourses = async (axios) => {
    console.log("Fetching all courses from db")

    try {
        const response = await axios.get('/api/courses/databaseGetCourses')
        console.log("fetchdtabaseCourses:", response.data)
        setDbCourses(response.data)
        return response.data
    } catch (error) {
        console.error("Error fetching all courses", error)
    }
  }

  useEffect(() => {
    fetchDatabaseCourses(axios)
  }, [])

  console.log(dbCourses)

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch(axios, courses, searchText);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submits this:",searchText);
    handleSearch(axios, courses, searchText);
  }
  
  const handleChange = (event, newValue) => {
    setSearchText(newValue);
    console.log(searchText);
  };

  return ( 
    <div className='searchbar'>   
    <form onSubmit={handleSubmit}>
    <Autocomplete
      className='autocomplete'
      disablePortal
      id="combo-box-demo"
      options={dbCourses}
      inputValue={searchText}
      onInputChange={handleChange}
      getOptionLabel={(option) => option.course_name}
      renderOption={(props, option) => (
          <Box component="li" sx={{ p: 2, border: '1px dashed grey' }} {...props}>
                {option.course_name} ({option.hy_course_id})
          </Box>
        )}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} 
      label="Search courses"
      variant="standard"
      />}
    />
    </form>
    </div>
  )
    
}

/* return (
  <div className='searchbar'>
  <form onSubmit={handleSubmit}>
  <TextField
      id="input-with-icon-textfield"
      style={{background: "rgb(105,105,105)"}} 
      variant='standard'
      placeholder="   Search course..."
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      value={searchText}
      InputProps={{
          endAdornment: (
            <InputAdornment position="end" onClick={handleSubmit}>
              <SearchIcon/>
            </InputAdornment>
          )}}
    />
  </form>
  </div>
) */

export default SearchBar
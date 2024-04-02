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

  const fetchDatabaseSearchSuggestions = async (axios) => {
    console.log("Fetching all courses from db")

    try {
        const response = await axios.get('/api/courses/databaseGetCourses')
        setDbCourses(response.data)
        return response.data
    } catch (error) {
        console.error("Error fetching all courses", error)
    }
  }

  useEffect(() => {
    fetchDatabaseSearchSuggestions(axios)
  }, [])

  const handleSubmit = (event, searchQuery) => {
    event.preventDefault();
    const code = searchQuery || (searchText ? searchText.split(" ")[0] : '');
    props.handleSearch(code)
  }
  
  const handleChange = (event, newValue) => {
    setSearchText(newValue);
  };

  const handleSelect = (event, newValue) => {
    if (newValue === null) {
      return;
    }
    if (event.type === 'click' ) {
      setSearchText(newValue.hy_course_id + " (" + newValue.course_name +")");
      handleSubmit(event, newValue.hy_course_id)  
    }
  }

  return ( 
    <div className='searchbar'>   
    <form onSubmit={handleSubmit}>
    <Autocomplete
      className='autocomplete'
      id="searchBar"
      options={dbCourses}
      inputValue={searchText}
      onInputChange={handleChange}
      onChange={handleSelect}

      getOptionLabel={(option) => option.hy_course_id + " (" + option.course_name + ")"}
      renderOption={(props, option) => (
          <Box component="li" sx={{ p: 2 }} {...props}>
                {option.hy_course_id} ({option.course_name})
          </Box>
        )}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} 
        label="Search courses:"
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
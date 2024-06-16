import React from 'react';
import { useState, useEffect } from 'react';
import "../styles/searchbar.css"
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';

export const SearchBar = (props) => {
  const [searchText, setSearchText] = useState('');
  const [dbCourses, setDbCourses] = useState([]);
  const axios = props.axiosInstance;

  const fetchDatabaseSearchSuggestions = async (axios) => {
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
          <Box component="li" sx={{ p: 2 }} {...props} className="searchResult">
                {option.hy_course_id} ({option.course_name})
          </Box>
        )}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params}
        id="textField"
        data-testid="testTextField"
        InputProps={{ ...params.InputProps, disableUnderline: true}}
        label="Hae kurssi:"
        variant="standard"
        InputLabelProps={{style: {color: '#fff', fontSize: 20}}}
        
      />}
    />
    </form>
    </div>
  )
}

export default SearchBar
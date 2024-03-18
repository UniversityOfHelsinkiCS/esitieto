import { useState } from 'react';
import { handleSearch } from '../functions/CourseFunctions';
import { TextField } from '@mui/material';
import "../styles/searchbar.css"
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBar = (props) => {
  const [searchText, SetSearchText] = useState('');
  const axios = props.axiosInstance;
  const courses = props.onCoursesUpdated

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch(axios, courses, searchText);
    }
  }

  const handleSubmit = (event) => {
    handleSearch(axios, courses, searchText);
  }
  
  const handleChange = (event) => {
    event.preventDefault()
    SetSearchText(event.target.value)
  }
    return (
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
    )
}

export default SearchBar
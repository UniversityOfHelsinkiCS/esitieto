import { TextField } from '@mui/material';
import "../styles/searchbar.css"
import { Button, IconButton } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBar = () => {
    return (
        <div className='searchbar'>
        <TextField
            id="input-with-icon-textfield"
            style={{background: "rgb(105,105,105)"}} variant='standard'
            placeholder="Search course..."
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon/>
                  </InputAdornment>
                ),
              }}/>
        </div>
    )
}

export default SearchBar
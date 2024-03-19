import {
    addCourse, removeCourse, // Courses from database
    handleAddDependency, handleRemoveDependency, // Dependencies from database
    handleKORIAPITEST, handleFetchKORIByName, handleFetchKORICourseInfo, // Kori
} from '../functions/CourseFunctions.jsx';
import { useState } from 'react';
import { TextField } from '@mui/material';
import "../styles/EditWindow.css"
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

export const EditWindowTemplate = (props) => {
    const [state, setState] = useState(props.state)
    const labels = props.labels
    const desc = props.desc
    const cfunc = props.cfunc
    const axios = props.axios
    const courses = props.courses
    const [searchText, SetSearchText] = useState('');

    const handleChange = (event) => {
        event.preventDefault();
        SetSearchText(event.target.value);
      }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (cfunc==='remove') {
            removeCourse(axios,courses,event.target.value)
            setState(false)
        }
        
    }

    if (state) {
    return (
        <div className="edit-window">
            <div className='desc1'>
                <p>{desc[0]}</p>
            </div>
            <form onSubmit={handleSubmit}>
            <TextField
            className='textfield1'
            variant='standard'
            label = {labels[0]}
            onChange={handleChange}
            value={searchText}
            InputProps={{
                endAdornment: (
                  <InputAdornment position="end" onClick={handleSubmit}>
                    <SearchIcon/>
                  </InputAdornment>
                )}}
            />
            <button className='submit-button' onClick={handleSubmit}>SUBMIT</button>
            </form>
        </div>
    )}
}

export default EditWindowTemplate
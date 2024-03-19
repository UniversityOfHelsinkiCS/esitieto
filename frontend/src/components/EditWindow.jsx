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
    const [searchText, SetSearchText] = useState('')
    const [texts, SetTexts] = useState(Array.from({length: labels.length}, () => ''))

    let windowClass;
    if (labels.length===1) {
        windowClass = 'edit-window1'
    }
    if (labels.length===2) {
        windowClass = 'edit-window2'
    }
    if (labels.length===3) {
        windowClass = 'edit-window3'
    }

    const handleChange = (event, textfield) => {
        event.preventDefault();
        SetSearchText(event.target.value);
        texts[textfield] = event.target.value;
      }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (cfunc==='remove') {
            console.log('use remove course function',texts[0])
            removeCourse(axios,courses,texts[0])
            setState(false)
        }

        if (cfunc==='add course') {
            console.log('use add course function with info:', texts[0], texts[1], texts[2])
            addCourse(axios, courses, texts[0], texts[1], texts[2])
            setState(false)
        }
        
    }

    if (state) {
    return (
        <div className={windowClass}>
            <div className='desc1'>
                <p>{desc[0]}</p>
            </div>
            <form onSubmit={handleSubmit}>
            <div>
            <TextField
            className='textfield1'
            variant='standard'
            label = {labels[0]}
            onChange={(event) =>handleChange(event,0)}
            value={texts[0]}
            InputProps={{
                endAdornment: (
                  <InputAdornment position="end" onClick={handleSubmit}>
                    <SearchIcon/>
                  </InputAdornment>
                )}}
            />
            </div>

            {labels.length >= 2 &&
            <div className='desc2'>
            <p>{desc[1]}</p>
            </div>}
            {labels.length >= 2 &&
            <div>
            <TextField
            className='textfield2'
            variant='standard'
            label = {labels[1]}
            onChange={(event) =>handleChange(event,1)}
            value={texts[1]}
            InputProps={{
                endAdornment: (
                  <InputAdornment position="end" onClick={handleSubmit}>
                    <SearchIcon/>
                  </InputAdornment>
                )}}
            />
            </div>}

            {labels.length >= 3 &&
            <div className='desc3'>
            <p>{desc[2]}</p>
            </div>}
            {labels.length >= 3 &&
            <div>
            <TextField
            className='textfield3'
            variant='standard'
            label = {labels[2]}
            onChange={(event) =>handleChange(event,2)}
            value={texts[2]}
            InputProps={{
                endAdornment: (
                  <InputAdornment position="end" onClick={handleSubmit}>
                    <SearchIcon/>
                  </InputAdornment>
                )}}
            />
            </div>}
        <button onClick={handleSubmit} style={{ marginTop:'10%' }}>SUBMIT</button>
        </form>
        </div>
    )}
}

export default EditWindowTemplate
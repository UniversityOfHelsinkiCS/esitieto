import {
    addCourse, removeCourse, // Courses from database
    handleAddDependency, handleRemoveDependency, // Dependencies from database
} from '../functions/CourseFunctions.jsx';
import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import "../styles/EditWindow.css"
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

export const EditWindowTemplate = (props) => {
    const [state, setState] = useState(props.state)
    const labels = props.labels
    const desc = props.desc
    const cfunc = props.cfunc
    const axios = props.axios
    const courses = props.courses
    const [dbCourses, setDbCourses] = useState([])
    const [texts, setTexts] = useState(Array.from({length: labels.length}, () => ''))
    const [searchText, SetSearchText] = useState('')

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

    const handleSubmit = (event) => {
        event.preventDefault();
        if (cfunc==='remove') {
            console.log('use remove course function',texts[0]);
            removeCourse(axios,courses,texts[0]);
            setState(false);
        }

        if (cfunc==='add course') {
            console.log('use add course function with info:', texts[0], texts[1], texts[2]);
            addCourse(axios, courses, texts[0], texts[1], texts[2]);
            setState(false); 
        }

        if (cfunc==='add dependency') {
            console.log('use add dependency function with info:', texts[0], texts[1]);
            handleAddDependency(axios, texts[0], texts[1]);
            setState(false);
        }
        
        if (cfunc==='remove dependency') {
            console.log('use remove dependency function with info:', texts[0], texts[1]);
            handleRemoveDependency(axios, texts[0], texts[1]);
            setState(false);
        }
    }

    const AutocompleteSearch = (props) => {
        const index = props.index

        // const handleChange = (event) => {
        //     console.log(texts, index, event.target.value)
        //     event.preventDefault();
        //     const newText = event.target.value;
        //     const newTexts = [...texts];
        //     newTexts[index] = newText
        //     console.log(newTexts)
        //     setTexts(newTexts);
        //     console.log(index, texts)
        //   }

        return(
        <div>
        <p>{desc[index]}</p>
        <Autocomplete
        className={'autocomplete'+index}
        disablePortal
        options={dbCourses}
        inputValue={texts[index]}
        // onInputChange={handleChange}
        getOptionLabel={(option) => option.hy_course_id + " (" + option.course_name + ")"}
        renderOption={(props, option) => (
        <Box component="li" sx={{ p: 2, border: '1px dashed grey' }} {...props}>
            {option.course_name} ({option.hy_course_id})
        </Box>
        )}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} 
        label={labels[{index}]}
        variant="standard"
        />}
        />
        </div>
        )
    }

    if (state) {
    return (
        <div className={windowClass}>
            <IconButton onClick={()=>setState(false)} style={{marginLeft:'90%'}}>
            <ClearIcon/>
            </IconButton>
            <form onSubmit={handleSubmit}>
                <AutocompleteSearch index={0}/>

                {labels.length >= 2 &&
                <AutocompleteSearch index={1}/>}

                {labels.length >= 3 &&
                <AutocompleteSearch index={2}/>}

            <button onClick={handleSubmit} style={{ marginTop:'10%' }}>SUBMIT</button>
            </form>
        </div>
    )}
    /*<div>
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
        */
}

export default EditWindowTemplate
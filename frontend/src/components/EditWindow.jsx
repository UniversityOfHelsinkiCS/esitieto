

// NOT IN USE // IGNORED IN JEST CONFIG //

/*
import {
    addCourse, removeCourse, 
    handleAddDependency, handleRemoveDependency, 
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

    const handleChange = (event) => {
        event.preventDefault();
        const newText = event.target.value;
        const newTexts = [...texts];
        newTexts[index] = newText
        setTexts(newTexts);
    }

    const AutocompleteSearch = (props) => {
        const index = props.index

        return(
        <div>
        <p>{desc[index]}</p>
        <Autocomplete
        className={'autocomplete'+index}
        disablePortal
        options={dbCourses}
        inputValue={texts[index]}
        onInputChange={handleChange}
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

    const TextfieldSearch = (props) => {
        const index = props.index

        return (
            <div>
            <p>{desc[index]}</p>
            <TextField
            variant='standard'
            label = {labels[index]}
            onChange={(event) =>handleChange(event,index)}
            value={texts[index]}
            InputProps={{
                endAdornment: (
                  <InputAdornment position="end" onClick={handleSubmit}>
                    <SearchIcon/>
                  </InputAdornment>
                )}}
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
                <TextfieldSearch index={0}/>

                {labels.length >= 2 &&
                <TextfieldSearch index={1}/>}

                {labels.length >= 3 &&
                <TextfieldSearch index={2}/>}

            <button onClick={handleSubmit} style={{ marginTop:'10%' }}>SUBMIT</button>
            </form>
        </div>
    )}
}

export default EditWindowTemplate
*/
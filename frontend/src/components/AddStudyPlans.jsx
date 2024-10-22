import React, {useState, useEffect} from 'react';
import '../styles/AddStudyPlans.css';
import { error as displayError } from './messager/messager';
import { Menu, MenuItem, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const AddStudyPlans = ({ isOpen, axiosInstance, onCreate, setNewCoursePlan, onClick }) => {
  const [newName, setNewName] = useState('')
  const [listOfDegrees, setDegreeToList] = useState([]);
/*  const [anchorEl, setAnchorEl] = useState(null); */
  const [selectedDegree, setSelectedDegree] = useState("");


  const fetchDegrees = async () => {  // UUSI ROUTE api/degrees/degree_names
    try {
      const response = await axiosInstance.get(`/api/degrees`);
      if (response == null) {
        displayError("Palvelimelle ei saatu yhteyttä")
        return;
      }
      setDegreeToList(response.data);
    } catch (error) {
      console.error("Error when fetching degree data: ", error);
      displayError("Jokin meni pieleen. Yritä uudestaan myöhemmin.")
    }
  };

  useEffect(() => {
    fetchDegrees();
  }, []);

  const createStudyPlan = async (event) => {  
    
    const studyPlanObject = {
      degree_name: newName,
      degree_years: selectedDegree.degree_years,
      hy_degree_id: selectedDegree.hy_degree_id,
      //uid: 'rest'
    };/*

    try {
      const response = await axiosInstance.post(`/api/degrees/create_studyplan`, studyPlanObject);
      if (response.status === 201) { // Assumption that successful creation returns 201
        setNewCoursePlan(response.data); // Assumption that response.data contains the created study plan
        onCreate();
        setNewName('');
        setSelectedDegree([]);
      } else {
        displayError("Opintosuunnitelman luominen epäonnistui.");
      }
    } catch (error) {
      console.error("Error when creating study plan:", error);
      displayError("Jokin meni pieleen. Yritä uudestaan myöhemmin.");
    }*/
    setNewCoursePlan(studyPlanObject) // Here are placeholders since the API is not yet functional    
    setNewName('');
    setSelectedDegree([]);
    onCreate();
    };

  if (!isOpen) {
    return null;
  }

  

//kokeilu

const handleChange = (event) => {
  setSelectedDegree(event.target.value);
};

//kokeilu

/*  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
*/
  const handleDegreeClick = (degree) => {
  /*  setAnchorEl(null);*/
    setSelectedDegree(degree)
  };


  return (
    <div className="study-plans-view">
      <div className="close-button">
      <IconButton
          onClick={onClick} 
          aria-label="close" 
        >
          <CloseIcon />
      </IconButton>
      </div>
      <h3>Luo kurssikokonaisuus</h3>
      <div>
{/*
      <div className="dropdown">
            <button className="dropdown-button" onClick={handleMenuClick}>
              Valitse pääaine
            </button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {listOfDegrees.map((degree) => (
                <MenuItem key={degree.hy_degree_id} onClick={() => handleDegreeClick(degree)}>
                  {degree.degree_name}
                </MenuItem>
              ))}
            </Menu>
      </div>

*/ }



    
      <div>
       <Box sx={{ minWidth: 300 }}>
        <FormControl fullWidth>
          <InputLabel id="choose-major">Valitse pääaine</InputLabel>
          <Select
            labelId="choose-major"
            value={selectedDegree}
            label="selectedDegree"
            onChange={handleChange}
          >
               {listOfDegrees.map((degree) => (
                  <MenuItem value={degree} key={degree.hy_degree_id} onClick={() => handleDegreeClick(degree)}>
                    {degree.degree_name}
                  </MenuItem>
              ))}
          </Select>
        </FormControl>
       </Box>

      </div>
    {/*  <p className="selected-degree">{selectedDegree.degree_name}</p>*/}
      <form onSubmit={createStudyPlan}>
          <div>
            <label className="form-label">Anna kurssikokonaisuudelle nimi:</label> 
            <input
              className='form-input'
              value={newName}
              onChange={({ target }) => setNewName(target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">Luo uusi</button>
        </form>
      </div>
    </div>
  );
};

export default AddStudyPlans;
import React, {useState, useEffect} from 'react';
import '../styles/AddStudyPlans.css';
import { error as displayError } from './messager/messager';
import { Menu, MenuItem} from '@mui/material'; 


const AddStudyPlans = ({ isOpen, axiosInstance }) => {
  const [newName, setNewName] = useState('')
  const [listOfDegrees, setDegreeToList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDegree, setSelectedDegree] = useState([]);

  const fetchDegrees = async () => {
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
    event.preventDefault()

    /*
    const studyPlanObject = {
      name: NewName,
      degree: selectedDegree
    }

    addStudyPlan(blogObject) */
    setNewName('')
    setSelectedDegree('')

  }
  if (!isOpen) {
    return null;
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDegreeClick = (degree) => {
    setAnchorEl(null);
    setSelectedDegree(degree)
  };

  return (
    <div className="study-plans-view">
      <h2>Kurssikokonaisuuden luominen</h2>
      <div>
      <form onSubmit={createStudyPlan}>
        <div>
            Title:
          <input
            value={newName}
            onChange={({ target }) => setNewName(target.value)}
            placeholder="Name"
          />
        </div>
        <p>{selectedDegree.degree_name}</p>

        <div className="buttons">
          <button type="button" onClick={handleMenuClick}>
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
           
        <button type="submit">Luo uusi</button>
      </form>
    </div>
    </div>
  );
};

export default AddStudyPlans;
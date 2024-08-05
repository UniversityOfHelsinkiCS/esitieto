import React, { useState, useEffect } from 'react';
import '../styles/AddPrerequisites.css';
//import { error as displayError } from './messager/messager';


const AddPrerequisites = ({ isOpen, axiosInstance, selectedDegree}) => {
  const [courseCode, setCourseCode] = useState('');
  const [prerequisiteCodes, setPrerequisiteCodes] = useState('');  

  /* const fetchDegrees = async () => {
    try {
      const response = await axiosInstance.get(`/api/degrees`);
      if (response == null) {
        displayError("Palvelimelle ei saatu yhteyttä");
        return;
      }
      setDegreeToList(response.data);
    } catch (error) {
      console.error("Error when fetching degree data: ", error);
      displayError("Jokin meni pieleen. Yritä uudestaan myöhemmin.");
    }
  };

  useEffect(() => {
    fetchDegrees();
  }, []); */

  const addPrerequisites = async (event) => {   // 
    event.preventDefault();
    /*
    const prerequisitesObject = {
      courseCode: courseCode,
      prerequisiteCodes: prerequisiteCodes
    }

    addPrerequisites(prerequisitesObject) */
    setCourseCode('');
    setPrerequisiteCodes('');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="prerequisites-view">
      <h2>Tutkinnon luominen: TÄHÄN selectedDegree.degree_name </h2>      
      <form onSubmit={addPrerequisites}>
        <div>
          <label>Anna lisättävän kurssin kurssikoodi</label>
          <input
            value={courseCode}
            onChange={({ target }) => setCourseCode(target.value)}
            placeholder="TKT200005"
          />
        </div>
        <div>
          <label>Anna kurssille esitietokurssit kurssikoodeilla</label>
          <input
            value={prerequisiteCodes}
            onChange={({ target }) => setPrerequisiteCodes(target.value)}
            placeholder="TKT200007, TKT200009..."
          />
        </div>
        <button type="submit">Lisää</button>
      </form>
    </div>
  );
};

export default AddPrerequisites;
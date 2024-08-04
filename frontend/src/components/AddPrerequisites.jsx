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

  const addPrerequisites = async (event) => {
    event.preventDefault();
    /*
    const prerequisitesObject = {
      courseCode: courseCode,
      prerequisiteCodes: prerequisiteCodes.split(',').map(code => code.trim())
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
      <button className="save-degree-button">Tallenna tutkinto</button>
      <form onSubmit={addPrerequisites}>
        <div>
          <label>Hae lisättävä kurssi kurssikoodilla</label>
          <input
            value={courseCode}
            onChange={({ target }) => setCourseCode(target.value)}
            placeholder="Kurssikoodi"
          />
        </div>
        <div>
          <label>Lisää haettavalle kurssille esiteokurssit kurssikoodeilla</label>
          <input
            value={prerequisiteCodes}
            onChange={({ target }) => setPrerequisiteCodes(target.value)}
            placeholder="Esitietokurssien koodit"
          />
        </div>
        <button type="submit">Lisää</button>
      </form>
    </div>
  );
};

export default AddPrerequisites;
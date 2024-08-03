import React from 'react';
import '../styles/AddStudyPlans.css';


const AddStudyPlans = ({ isOpen }) => { 

  if (!isOpen) {
    return null;
  }

  return (
    <div className="study-plans-view">
      <h2>Kurssikokonaisuuden luominen</h2>
    </div>
  );
};

export default AddStudyPlans;
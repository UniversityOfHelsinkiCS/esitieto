import React, { useState } from 'react';
import "../styles/navbar.css";
import SearchBar from './SearchBar';
import InfoBox from './InfoBox';
import DegreeSelectionMenu from './DegreeSelectionMenu';
import InfoButton from './InfoButton';
import LoginButton from './LoginButton';

export const Navbar = ({ handleDegreeChange, listOfDegrees, axiosInstance, handleSearch, baseURL, selectedDegreeName}) => {
  const [isInfoBoxOpen, setIsInfoBoxOpen] = useState(false);

  const openInfoBox = () => {
    setIsInfoBoxOpen(!isInfoBoxOpen);
  };

  const login = () => {
    window.location.href = import.meta.env.BASE_URL;
  }

  return (
    <nav className="nav">
      <ul className="navbar li">
        <li>
          <DegreeSelectionMenu
            onDegreeChange={handleDegreeChange}
            listOfDegrees={listOfDegrees}
          />
        </li>
        <li><SearchBar axiosInstance={axiosInstance} handleSearch={handleSearch} /></li>
        <li className='degree-name'>{selectedDegreeName}</li>
        <li><LoginButton onClick={login}/></li>
        <li><InfoButton onClick={openInfoBox} /></li>
        <li><InfoBox isOpen={isInfoBoxOpen} onClose={() => setIsInfoBoxOpen(false)} baseURL={baseURL} /></li>
      </ul>
    </nav>
  );
};

export default Navbar;

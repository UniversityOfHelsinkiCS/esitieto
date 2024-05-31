import React, { useState } from 'react';
import "../styles/navbar.css";
import SearchBar from './SearchBar';
import InfoBox from './InfoBox';
import DegreeSelectionMenu from './DegreeSelectionMenu';
import InfoButton from './InfoButton';

export const Navbar = ({ handleDegreeChange, listOfDegrees, axiosInstance, handleSearch, baseURL}) => {
  const [isInfoBoxOpen, setIsInfoBoxOpen] = useState(false);

  const openInfoBox = () => {
    setIsInfoBoxOpen(!isInfoBoxOpen);
  };

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
        <li><InfoButton onClick={openInfoBox} /></li>
        <li><InfoBox isOpen={isInfoBoxOpen} onClose={() => setIsInfoBoxOpen(false)} baseURL={baseURL} /></li>
      </ul>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { useState, useEffect } from 'react';
import "../styles/navbar.css"
import SearchBar from './SearchBar';
//import { InfoBox } from './InfoBox';
//import {  }



export const Navbar = (props) => {
    return (
      <nav className="nav">

        <ul className="navbar li">
          
          <li><button>TUTKINTO</button></li>
          <li><button>HAE KURSSI</button></li>
          <li><h3>{props.nameOfDegree}</h3></li>
          <li><button>INFO</button></li>

        </ul>

      </nav>
    );
  };
  
export default Navbar;


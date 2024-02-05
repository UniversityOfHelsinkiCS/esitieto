import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';



function DegreeSelectionMenu({ onDegreeChange, degree, listOfDegrees }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (degree) => {
    // setDegree(degree);
    onDegreeChange(degree); // Pass the selected degree back to the parent component
    handleClose();
  };

  return (
    <div>
      <Button
        aria-controls="degree-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="contained"
        sx={{
            color: 'black', 
            backgroundColor: 'white', // Custom background color
            '&:hover': {
              backgroundColor: 'gray', // Darker on hover
            },
          }}
      >
        {degree}
      </Button>
      <Menu
        id="degree-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {listOfDegrees.map((degreeOption) => (
          <MenuItem key={degreeOption} onClick={() => handleSelect(degreeOption)}>
            {degreeOption}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default DegreeSelectionMenu;

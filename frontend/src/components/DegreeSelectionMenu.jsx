import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';



function DegreeSelectionMenu({ onDegreeChange, degree, listOfDegrees }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const handleSelect = (degree) => {
    onDegreeChange(degree);
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
        //keepMounted
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

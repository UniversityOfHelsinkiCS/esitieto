import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';



function DegreeSelectionMenu({ onDegreeChange, listOfDegrees }) {
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
        id="degreeSelectionButton"
        aria-controls="degree-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="text"
        sx={{
          position: 'absolute',
          left: '35px',
          top: '20px',
          color: 'inherit',
          backgroundColor: 'inherit',
          '&:hover': {
            backgroundColor: 'inherit',
          },
          minHeight: 'auto',
          minWidth: 'auto',
          lineHeight: 'inherit',
          font: 'inherit',
          textTransform: 'none',
        }}
      >
        {'Valitse tutkinto'}
      </Button>
      <Menu
        id="degree-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {listOfDegrees.map((degreeOption) => (
          <MenuItem
            key={degreeOption.degree_name}
            onClick={() => handleSelect(degreeOption)}
            id={`degree-option-${degreeOption.degree_name.replace(/\s+/g, '-').toLowerCase()}`}
          >
            {degreeOption.degree_name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default DegreeSelectionMenu;

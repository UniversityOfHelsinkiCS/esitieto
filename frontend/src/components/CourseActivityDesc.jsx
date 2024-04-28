import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import findDescription from '../functions/FindDescription';

/*
export const findActivityPeriodDesc = (text) => {
  // Receives string with html code in it, Finds description based on words in title and returns it
  let title1 = -1;
  if (text.indexOf("Järjestämisajankohta") !== -1) {
    title1 = text.indexOf("Järjestämisajankohta");
  }
  if (text.indexOf("Ajoitus") !== -1) {
    title1 = text.indexOf("Ajoitus");
  }
  
  const startActivity = text.indexOf("</h5>",title1) + 5;
  const endActivity = text.indexOf("</p>", startActivity);
  const textActivity = text.slice(startActivity, endActivity);
  let fixedActivityText = preprocessContent(textActivity);
  
  if (title1 === -1) {
    fixedActivityText = '';
  }
  
  let title2 = text.indexOf("Suositeltava suoritusajankohta");
  const startRecommendation = text.indexOf("</h5>", title2) + 5;
  const endRecommendation = text.indexOf("</p>", startRecommendation);
  const textRecommendation = text.slice(startRecommendation, endRecommendation);
  let fixedRecommendation = preprocessContent(textRecommendation);
  
  if (title2 === -1) {
    fixedRecommendation = '';
  }
  
  return ([fixedActivityText, fixedRecommendation]);
};
*/

export const CourseActivityDesc = (props) => {
  const [activityDescState, setActivityDescState] = useState(false);

  const handleInfoClick = () => {
    if (activityDescState) {
      setActivityDescState(false);
    }
    else {
      setActivityDescState(true);
    }
  }
  
  let desc = ['',''];
  if (props.desc !== undefined) {
    desc = findDescription(props.desc, ['Järjestämisajankohta', 'Ajoitus', 'Suositeltava suoritusajankohta']);
  }
    
  return (
    <div>
    {desc[0][1] &&
    <div>
      <div className='timing'>
        <h3>Suoritusaika</h3>
        <IconButton aria-label="info" data-testid="infoIcon" onClick={() => handleInfoClick()}>
          <InfoIcon />
        </IconButton>
      </div>
      {activityDescState &&
        <div>
          <p>{desc[0][1]}</p>
          <p><b>Suositeltava suoritusajankohta:</b>
            {desc[2][1]}</p>
          </div>}
    </div>}
    </div>
    )
}
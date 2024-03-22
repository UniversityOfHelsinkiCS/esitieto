import React, { useState, useEffect } from 'react';
import {
  handleFetchKORIByName,
  handleFetchKORICourseInfo,
} from '../functions/CourseFunctions';
import CourseDescription from './CourseDescription';
import '../styles/sidebar.css';
import { Button, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { error as displayError } from '../components/messager/messager'


function preprocessContent(htmlContent) {
  let formattedContent = htmlContent.replace(/<br\s*\/?>/gi, '\n').replace(/<\/?p>/gi, '\n');
  formattedContent = formattedContent.replace(/<[^>]*>/g, '');
  formattedContent = formattedContent.replace(/\n\s*\n\s*\n+/g, '\n\n');

  if (formattedContent.startsWith('"') && formattedContent.endsWith('"')) {
      formattedContent = formattedContent.substring(1, formattedContent.length - 1);
  }
  return formattedContent;
}


const Sidebar = ({
  isOpen,
  closeSidebar,
  selectedCourseName,
  axiosInstance,
}) => {
  //const [courseDetails, setCourseDetails] = useState(null); Unused by eslint.
  const [selectedCoursePeriods, setSelectedCoursePeriods] = useState([]);
  const [courseActivityDesc, setCourseActivityDesc] = useState('')
  const [showActivityInfo, setShowActivityInfo] = useState(false)
  const [selectedCourseDescription, setSelectedCourseDescription] = useState('');
  const [courseInfo, setCourseInfo] = useState('');
  const [isCourseDescriptionOpen, setIsCourseDescriptionOpen] = useState(false);

  const sortCourseActivityPeriod = (periods) => {
    let sortedPeriods = []
    let id = 1
    const wantedDate = "2024" // Might want to fetch automatically instead of hardcoded
    periods.forEach(period => {
      if (period.startDate.substring(0, 4) === wantedDate) {
        period.id = id
        sortedPeriods.push(period)
        id += 1
      }
    })
    return (sortedPeriods)
  }

  const findActivityPeriodDesc = (text) => {
    const start = text.indexOf("Järjestämisajankohta")
    if (start === -1) {
      return ('')
    }
    const end = text.indexOf("Opintokokonaisuus")
    if (end === -1) {
      return ('')
    }
    const fixedText = preprocessContent(text.substring(start, end))
    return (fixedText)
  }

  const handleInfoClick = () => {
    if (showActivityInfo) {
      setShowActivityInfo(false)
    }
    else {
      setShowActivityInfo(true)
    }
  }

  useEffect(() => {
    const getCourseInfo = async () => {
      if (!selectedCourseName) return;
      try {
        const responseByName = await handleFetchKORIByName(axiosInstance, selectedCourseName);
        if (responseByName && responseByName.length > 0) {
          const groupId = responseByName[0].groupId;
          const responseByInfo = await handleFetchKORICourseInfo(axiosInstance, groupId);
          if (responseByInfo && responseByInfo.length > 0) {
            const courseInfo = responseByInfo[0];
            //setCourseDetails(courseInfo);
            const periodList = sortCourseActivityPeriod(responseByName[0].activityPeriods);
            const desc = findActivityPeriodDesc(courseInfo.additional.fi);
            setCourseActivityDesc(desc);
            setSelectedCoursePeriods(periodList);

            const info = courseInfo.outcomes?.fi ? JSON.stringify(courseInfo.outcomes.fi, null, 2) : "unable to load metadata";
            const credits = courseInfo.credits ? courseInfo.credits.max : "unable to fetch credits";
            const code = courseInfo.groupId ? courseInfo.groupId : "unable to fetch code";
            setCourseInfo(preprocessContent(`${info}`));
            setSelectedCourseDescription(
              `My credits is worth: ${credits}
              My code is: ${code}`
            );
          }
        }
      } catch (error) {
        console.error("Failed to fetch course info:", error);
        setSelectedCourseDescription("Failed to fetch from KORI");
        displayError(`Kurssitietoja ei saatu haettua kurssista ${selectedCourseName}`)
      }
    };

    if (isOpen) {
      getCourseInfo();
    }
  }, [isOpen, selectedCourseName, axiosInstance]);

  if (!isOpen) return null;

  return (
    <div className="sidebar">
      <button onClick={closeSidebar} className="close-button">X</button>
      <h3>{selectedCourseName}</h3>
      <div className="suoritusaika">
        <h4>Suoritusaika</h4>
        <IconButton aria-label="info" onClick={() => handleInfoClick()}>
          <InfoIcon/>
        </IconButton>
      </div>
      <ul>
        {selectedCoursePeriods.map(period =>
          <li key={period.id}>
            {period.startDate}
          </li>
        )}
      </ul>
      {showActivityInfo && (<p>{courseActivityDesc}</p>)}
      <p>{selectedCourseDescription}</p>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setIsCourseDescriptionOpen(true)
        }}
      >
        Kurssin kuvaus
      </Button>
      {isCourseDescriptionOpen && (
        <CourseDescription
          isOpen={isCourseDescriptionOpen}
          onClose={() => setIsCourseDescriptionOpen(false)}
          content={courseInfo}
        />
      )}
    </div>
  );
};

export default Sidebar;

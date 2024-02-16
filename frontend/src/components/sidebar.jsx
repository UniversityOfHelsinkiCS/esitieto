import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import {
  handleFetchKORIByName,
  handleFetchKORICourseInfo,
} from './CourseFunctions';

const Sidebar = ({
  isOpen,
  closeSidebar,
  selectedCourseName,
  axiosInstance,
}) => {
  const [courseDetails, setCourseDetails] = useState(null);
  const [selectedCoursePeriod, setSelectedCoursePeriod] = useState('joku periodi');
  const [selectedCourseDescription, setSelectedCourseDescription] = useState('');

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
            setCourseDetails(courseInfo);

            const info = courseInfo.outcomes?.fi ? JSON.stringify(courseInfo.outcomes.fi, null, 2) : "unable to load metadata";
            const credits = courseInfo.credits ? courseInfo.credits.max : "unable to fetch credits";
            const code = courseInfo.groupId ? courseInfo.groupId : "unable to fetch code";

            setSelectedCourseDescription(`Course Description: ${info}
                My credits is worth: ${credits}
                My code is: ${code}`);
          }
        }
      } catch (error) {
        console.error("Failed to fetch course info:", error);
        setSelectedCourseDescription("Failed to fetch from KORI");
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
      <h4>Suoritusaika</h4>
      <p>{selectedCoursePeriod}</p>
      <p>{selectedCourseDescription}</p>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          console.log("Kurssin kuvaus painettu");
        }}
      >
        Kurssin kuvaus
      </Button>
    </div>
  );
};

export default Sidebar;

import React, { useState, useEffect } from 'react';
import {
  handleFetchKORIByName,
  handleFetchKORICourseInfo,
} from '../functions/CourseFunctions';
import CourseDescription from './CourseDescription';
import { CourseActivityDesc } from './CourseActivityDesc';
import '../styles/sidebar.css';
import { Button } from '@mui/material';
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
  //const [activityDesc, setActivityDesc] = useState(false);
  const [courseActivityDesc, setCourseActivityDesc] = useState('');
  const [selectedCourseDescription, setSelectedCourseDescription] = useState('');
  const [selectedCourseCredits, setSelectedCourseCredits] = useState('');
  const [courseInfo, setCourseInfo] = useState('');
  const [isCourseDescriptionOpen, setIsCourseDescriptionOpen] = useState(false);

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
            setCourseActivityDesc(courseInfo.additional.fi);
            const info = (
              courseInfo.content ?? courseInfo.outcomes)?.fi ? JSON.stringify(
                (courseInfo.content ?? courseInfo.outcomes).fi) : "unable to load metadata";
            const credits = courseInfo.credits ? courseInfo.credits.max : "unable to fetch credits";
            const code = courseInfo.code ? courseInfo.code : "unable to fetch code";
            setCourseInfo(preprocessContent(`${info}`));
            setSelectedCourseCredits(`Opintopisteet: ${credits}`);
            setSelectedCourseDescription(`Kurssikoodi: ${code}`)
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
      <h2>{selectedCourseName}</h2>
      <CourseActivityDesc desc={courseActivityDesc} />
      <p>{selectedCourseDescription}<br />
        {selectedCourseCredits}</p>
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

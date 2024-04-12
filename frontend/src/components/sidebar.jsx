import React, { useState, useEffect } from 'react';
import {
  handleFetchKORIByName,
  handleFetchKORICourseInfo,
} from '../functions/CourseFunctions';
import CourseDescription from './CourseDescription';
import '../styles/sidebar.css';
import { Button, IconButton } from '@mui/material';
import { error as displayError } from '../components/messager/messager'
import InfoIcon from '@mui/icons-material/Info';


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
  const [activityDesc, setActivityDesc] = useState(false);
  const [courseActivityDesc, setCourseActivityDesc] = useState('');
  const [selectedCourseDescription, setSelectedCourseDescription] = useState('');
  const [selectedCourseCredits, setSelectedCourseCredits] = useState('');
  const [courseInfo, setCourseInfo] = useState('');
  const [isCourseDescriptionOpen, setIsCourseDescriptionOpen] = useState(false);


  const findActivityPeriodDesc = (text) => {
    let title1 = -1;
    if (text.indexOf("Järjestämisajankohta") !== -1) {
      title1 = text.indexOf("Järjestämisajankohta");
    }
    if (text.indexOf("Ajoitus") !== -1) {
      title1 = text.indexOf("Ajoitus");
    }
    const startActivity = text.indexOf("</h5>",title1) + 5
    const endActivity = text.indexOf("<h5>", startActivity)
    const textActivity = text.slice(startActivity, endActivity)
    let fixedActivityText = preprocessContent(textActivity)

    if (title1 === -1) {
      fixedActivityText = ''
    }

    let title2 = text.indexOf("Suositeltava suoritusajankohta")
    const startRecommendation = text.indexOf("</h5>", title2) + 5
    const endRecommendation = text.indexOf("<h5>", startRecommendation)
    const textRecommendation = text.slice(startRecommendation, endRecommendation)
    let fixedRecommendation = preprocessContent(textRecommendation)

    if (title2 === -1) {
      fixedRecommendation = ''
    }
    console.log(startActivity)
    console.log(title1, "title1")
    console.log(title2, "title2")

    return ([fixedActivityText, fixedRecommendation])
  }

  const handleInfoClick = () => {
    if (activityDesc) {
      setActivityDesc(false);
    }
    else {
      setActivityDesc(true);
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
            console.log(courseInfo.additional.fi)
            const desc = findActivityPeriodDesc(courseInfo.additional.fi);
            setCourseActivityDesc(desc);
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
      {courseActivityDesc[0] &&
        <div>
          <div className='timing'>
            <h3>Suoritusaika</h3>
            <IconButton aria-label="info" onClick={() => handleInfoClick()}>
              <InfoIcon />
            </IconButton>
          </div>
          {activityDesc &&
            <div>
              <p>{courseActivityDesc[0]}</p>
              <p><b>Suositeltava suoritusajankohta:</b>
                {courseActivityDesc[1]}</p>
            </div>}
        </div>}

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

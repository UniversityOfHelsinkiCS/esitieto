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
  //const [courseDetails, setCourseDetails] = useState(null); Unused by eslint.
  const [selectedCoursePeriods, setSelectedCoursePeriods] = useState([]);
  const [courseActivityDesc, setCourseActivityDesc] = useState('')
  const [showActivityInfo, setShowActivityInfo] = useState(false)
  const [selectedCourseDescription, setSelectedCourseDescription] = useState('');
  const [selectedCourseCredits, setSelectedCourseCredits] = useState('');
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
    let start = text.indexOf("Järjestämisajankohta")
    const startActivity = text.indexOf("</h5>", start) + 5
    const endActivity = text.indexOf("<h5>", startActivity)
    const textActivity = text.slice(startActivity, endActivity)

    start = text.indexOf("Suositeltava suoritusajankohta")
    const startRecommendation = text.indexOf("</h5>", start) + 5
    const endRecommendation = text.indexOf("<h5>", startRecommendation)
    const textRecommendation = text.slice(startRecommendation, endRecommendation)

    // console.log(startActivity,endActivity)
    // console.log(startRecommendation,endRecommendation)
    // console.log(textActivity, textRecommendation)

    const fixedActivityText = preprocessContent(textActivity)
    const fixedRecommendation = preprocessContent(textRecommendation)
    return ([fixedActivityText, fixedRecommendation])
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
            // setSelectedCoursePeriods(periodList);
            // console.log(courseActivityDesc)
            // console.log(courseActivityDesc[0].length)
            // setSelectedCoursePeriods(periodList);

            const info = courseInfo.outcomes?.fi ? JSON.stringify(courseInfo.outcomes.fi, null, 2) : "unable to load metadata";
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
      <h3>{selectedCourseName}</h3>
      <div className="suoritusaika">
        {/* <h4>Suoritusaika</h4>
        <IconButton aria-label="info" onClick={() => handleInfoClick()}>
          <InfoIcon />
        </IconButton> */}
      </div>
      {/* <ul>
        {selectedCoursePeriods.map(period =>
          <li key={period.id}>
            {period.startDate}
          </li>
        )}
      </ul> */}
      {courseActivityDesc[0] &&
        <div>
          <h4>Järjestämisajankohta</h4>
          <p>{courseActivityDesc[0]}</p>
        </div>}
      {courseActivityDesc[1] &&
        <div>
          <h4>Suositeltava suoritusajankohta</h4>
          <p>{courseActivityDesc[1]}</p>
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

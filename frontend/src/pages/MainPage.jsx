import { useState, useEffect } from 'react'
import CourseGraph from '../components/CourseGraph';
import Sidebar from '../components/sidebar';
import Course from '../models/Course'
import DegreeSelectionMenu from '../components/DegreeSelectionMenu';
import Messenger from '../components/messager/MessagerComponent';
import { info, error as displayError } from '../components/messager/messager';
import InfoButton from '../components/InfoButton';

import { InfoBox } from '../components/InfoBox';
import { SearchBar } from '../components/SearchBar.jsx';


const MainPage = ({ axiosInstance }) => {
  const [listOfDegrees, setDegreeToList] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCourseName, setSelectedCourseName] = useState('');
  const [selectedCourseGroupID, setSelectedCourseGroupID] = useState('');
  const [courses, setCourses] = useState([]);
  const [isInfoBoxOpen, setIsInfoBoxOpen] = useState(false);

  const openInfoBox = () => {
      if(isInfoBoxOpen) {
          setIsInfoBoxOpen(false);
      } else {
          setIsInfoBoxOpen(true);
      }
  };
  
  const closeInfoBox = () => {
      setIsInfoBoxOpen(false);
    };

  const fetchDegreeCourses = async (degree) => {
    try {
      if(degree == null) {
        displayError("Jokin meni pieleen tutkintotietoja haettaessa!")
        console.error("Degree is null!")
        return;
      }
      const response = await axiosInstance.get(`/api/degrees/search_by_degree`, {
        headers: {
          'degree-id': degree.hy_degree_id,
          'degree-years': degree.degree_years, 
        }
      });

      if (response == null) {
        displayError("Jokin meni pieleen kurssitietoja haettaessa!");
        console.error("Response is null!")
        return;
      } 
      const convertedCourses = response.data.map(courseData => new Course(
        courseData.name, 
        courseData.identifier, 
        courseData.kori_id, 
        courseData.dependencies, 
        courseData.type, 
        courseData.description, 
        courseData.x, 
        courseData.y));
        
      setCourses(convertedCourses);
      if (convertedCourses.length === 0 || convertedCourses == null) {
        displayError("Kurssitietoja ei löytynyt!");
        return;
      }
      info("Haettiin tutkinto: " + degree.degree_name);

    } catch (error) {
      console.error("Error fetching data: ", error);
      displayError("Jokin meni pieleen!");
    }
  };

  const handleSearch = async (courseId) => {
    if (courseId === "") {
      return;
    }
    let response;
    response = await axiosInstance.get('/api/courses/databaseGetCourseWithRequirements/'+courseId)
    if (response == null || response.status === 404) {
      displayError("Kurssitietoja ei löytynyt!")
      return;
    }
    const convertedCourses = response.data.map(courseData => new Course(courseData.course_name, courseData.identifier, courseData.groupId, courseData.dependencies, 'compulsory'));
    setCourses(convertedCourses);
  }

  const fetchDegrees = async () => {
    try {
      const response = await axiosInstance.get(`/api/degrees`);
      if (response == null) {
        displayError("Palvelimelle ei saatu yhteyttä")
        return;
      }
      setDegreeToList(response.data);
    } catch (error) {
      console.error("Error when fetching degree data: ", error);
      displayError("Jokin meni pieleen. Yritä uudestaan myöhemmin.")
    }
  };

  useEffect(() => {
    fetchDegrees();
  }, []);
  
  useEffect(() => {
    if (listOfDegrees == null || listOfDegrees.length === 0) return

    const degreeToFetch = listOfDegrees.find(degree => degree.degree_name === 'Tietojenkäsittelytieteen kandidaattitutkinto 2023-2026');
    if (degreeToFetch) {
      fetchDegreeCourses(degreeToFetch);
    } else {
      fetchDegreeCourses(listOfDegrees[0]);
    }    
  }, [listOfDegrees]);

  const handleDegreeChange = (degree) => {
    fetchDegreeCourses(degree)
  };

  return (
    <div>
      
      <Messenger />
      <CourseGraph
        axiosInstance={axiosInstance}
        courses={courses}
        setSelectedCourseName={setSelectedCourseName}
        setSelectedCourseGroupID={setSelectedCourseGroupID}
        setIsSidebarOpen={setIsSidebarOpen}
        handleSearch={handleSearch}
      />

      <div className="searchBar-container">
       <SearchBar axiosInstance={axiosInstance} handleSearch={handleSearch}/>
      </div>
      
      <div className="infoButton-container">
        <InfoButton onClick={openInfoBox} />
        <InfoBox isOpen={isInfoBoxOpen} onClose={closeInfoBox} baseURL={axiosInstance.defaults.baseURL} />
      </div>

      <div className="degree-menu-container">  
        <DegreeSelectionMenu
          onDegreeChange={handleDegreeChange}
          listOfDegrees={listOfDegrees}
        />
      </div>
      
      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
        selectedCourseName={selectedCourseName}
        selectedCourseGroupID={selectedCourseGroupID}
        axiosInstance={axiosInstance}
      />
    </div>
  );
}

export default MainPage;
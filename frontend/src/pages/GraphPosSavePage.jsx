import { useState, useEffect } from 'react'
import CourseGraph from '../components/CourseGraph';
import Course from '../models/Course'
import DegreeSelectionMenu from '../components/DegreeSelectionMenu';
import Messenger from '../components/messager/MessagerComponent';
import { error as displayError } from '../components/messager/messager';
import { Button } from '@mui/material';
import '../styles/GraphPosSavePage.css';
import LogoutButton from '../components/LogoutButton';

const GraphPosSavePage = ({ axiosInstance }) => {
  const [listOfDegrees, setDegreeToList] = useState([]);
  const [courses, setCourses] = useState([]);
  const [coursePositions, saveCoursePositions] = useState({});
  const [degree, setDegree] = useState(null);


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
        courseData.groupId, 
        courseData.dependencies, 
        courseData.type, 
        courseData.description, 
        courseData.x, 
        courseData.y));

      setCourses(convertedCourses);
      if (!convertedCourses || convertedCourses.length === 0) {
        throw new Error("Kurssitietoja ei löytynyt!");
      }

    } catch (error) {
      console.error("Error fetching data: ", error);
      displayError(error.message || "Jokin meni pieleen!");
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
    const fetchData = async () => {
      try {
        await fetchDegrees();
      } catch (error) {
        console.error('Error fetching degrees:', error);
      }
    };
  
    fetchData();
  }, []);
  
  
  useEffect(() => {
    const degreeToFetch = listOfDegrees.find(degree => degree.degree_name === 'Tietojenkäsittelytieteen kandidaattitutkinto 2023-2026');
    if (degreeToFetch) {
      fetchDegreeCourses(degreeToFetch);
    } else if (listOfDegrees[0]) {
      fetchDegreeCourses(listOfDegrees[0]);
    }    
  }, [listOfDegrees]);
    
  const handleDegreeChange = (degree) => {
    fetchDegreeCourses(degree)
    setDegree(degree);
  };

  const handleNewPositions = async () => {
    await axiosInstance.post(`/api/degrees/save_positions`, {
        'degreeId': degree.hy_degree_id,
        'degreeYears': degree.degree_years,
        'coursePositions': coursePositions
    }
  )
  };

  const resetPositions = async () => {
    await axiosInstance.post(`/api/degrees/reset_positions`, {
        'degreeId': degree.hy_degree_id,
        'degreeYears': degree.degree_years
    });
    handleDegreeChange(degree);
  };

  const logout = () => {
    const baseURL = import.meta.env.BASE_URL.replace('/esitieto', '');
    window.location.href = baseURL + "/Shibboleth.sso/Logout";
  }
  

  return (
    <div>

      <Messenger />

      <CourseGraph
        axiosInstance={axiosInstance}
        courses={courses}
        handleSearch={handleSearch}
        savePositions={saveCoursePositions}
      />
      <div className="degree-menu-container">
        <DegreeSelectionMenu
          onDegreeChange={handleDegreeChange}
          listOfDegrees={listOfDegrees}
        />
      </div>
      <div className="position-save-container"> 
        <Button
        id="position-save"
        onClick={handleNewPositions}
        className="position-save-button"
      >
        {'Tallenna sijainnit'}
      </Button>
      </div>   
      <div className="position-reset-container"> 
        <Button
        id="position-reset"
        onClick={resetPositions}
        className="position-reset-button"
      >
        {'Nollaa sijainnit'}
      </Button>
      </div>
      <LogoutButton onClick={logout} />   
    </div>
  );
}

export default GraphPosSavePage;
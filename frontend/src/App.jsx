import { useState, useEffect  } from 'react'
import axios from 'axios';
import './App.css'
import CourseGraph from './components/CourseGraph';
import Course from './models/Course'
import DegreeSelectionMenu from './components/DegreeSelectionMenu';

function App() {
  const [courses, setCourses] = useState([]);

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001'
  });

  const fetchCourses = async () => {
    try {
      const response = await axiosInstance.get('/api/courses');

      if(response == null) return;
      setCoursesData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const setCoursesData = (data = null) => {
    if (data==null) {
      console.log("No data to set courses!");
      return;
    } else if (data=="fetch") {
      fetchCourses();
      return;
    }

    console.log("data",data);
  
    // The description will be fetched from kori API when the sidebar is opened due to retrieving the most up-to-date scheduling, so this implementation will probably change.
    const convertedCourses = data.map(courseData => new Course(courseData.name, courseData.identifier, courseData.groupId, courseData.dependencies, courseData.type, courseData.description));
    setCourses(convertedCourses);
  };

  const fetchDegrees = async () => {
    try {
      const response = await axiosInstance.get('/api/degrees');
      if(response == null) return;
      setDegreeData(response.data);
    } catch (error) {
      console.error("Error fetching degree data: ", error);
    }
  };

  const setDegreeData = (data = null) => {
    if (data==null) {
      console.log("No data to set degrees!");
      return;
    } else if (data=="fetch") {
      fetchDegrees();
      return;
    }
  
    const convertedDegrees = data.map(degreeData => degreeData.degree_name);
    setDegreeToList(convertedDegrees);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    fetchDegrees();
  }, []);

  const handleDegreeChange = (degree) => {
    console.log("Selected Degree: ", degree); 
    setDegree(degree);
  };


  // What is the default degree? This needs to be solved later
  const [degree, setDegree] = useState('TKT 23-26');
  const [listOfDegrees, setDegreeToList] = useState([]);



return (
  <div>
    <CourseGraph axiosInstance={axiosInstance} courses={courses} onCoursesUpdated={setCoursesData}/>
    <div className="degree-menu-container">
      <DegreeSelectionMenu onDegreeChange={handleDegreeChange} degree={degree} listOfDegrees={listOfDegrees} />
    </div>
  </div>
)
}

export default App

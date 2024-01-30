import { useState, useEffect  } from 'react'
import axios from 'axios';
import './App.css'
import CourseGraph from './components/CourseGraph';
import Course from './models/Course'

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

    const convertedCourses = data.map(courseData => new Course(courseData.name, courseData.identifier, courseData.dependencies, courseData.type, courseData.description));
    setCourses(convertedCourses);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <CourseGraph axiosInstance={axiosInstance} courses={courses} onCoursesUpdated={setCoursesData}/>
    </div>
  )
}

export default App

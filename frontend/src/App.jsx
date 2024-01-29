import { useState, useEffect  } from 'react'
import axios from 'axios';
import './App.css'
import CourseGraph from './components/CourseGraph';
import Course from './models/Course'

function App() {
  const [courses, setCourses] = useState([]);

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
  });

  const fetchCourses = async () => {
    try {
      const response = await axiosInstance.get('/api/courses');
      const convertedCourses = response.data.map(courseData => new Course(courseData.name, courseData.identifier, courseData.dependencies, courseData.type));
      console.log("Courses fetched:", convertedCourses);
      setCourses(convertedCourses);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <CourseGraph axiosInstance={axiosInstance} courses={courses} onCoursesUpdated={fetchCourses}/>
    </div>
  )
}

export default App

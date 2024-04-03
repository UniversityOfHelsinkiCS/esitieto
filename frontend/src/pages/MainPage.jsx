import { useState, useEffect } from 'react'
import CourseGraph from '../components/CourseGraph';
import Sidebar from '../components/sidebar';
import Course from '../models/Course'
import DegreeSelectionMenu from '../components/DegreeSelectionMenu';
import Messenger from '../components/messager/MessagerComponent';
import { info, error as displayError } from '../components/messager/messager';


const MainPage = ({ axiosInstance }) => {
  const [listOfDegrees, setDegreeToList] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCourseName, setSelectedCourseName] = useState('');
  const [courses, setCourses] = useState([]);

  const fetchDegreeCourses = async (degree) => {
    try {
      if(degree == null) {
        displayError("Jokin meni pieleen tutkintotietoja haettaessa!")
        console.error("Degree is null!")
        return;
      }
      let response;
      response = await axiosInstance.get(`/api/degrees/search_by_degree`, {
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
      const convertedCourses = response.data.map(courseData => new Course(courseData.name, courseData.identifier, courseData.groupId, courseData.dependencies, courseData.type, courseData.description));
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
    fetchDegreeCourses(listOfDegrees[0]);
    
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
        setIsSidebarOpen={setIsSidebarOpen}
        handleSearch={handleSearch}
      />
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
        axiosInstance={axiosInstance}
      />
    </div>
  );
}

export default MainPage;
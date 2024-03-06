import { useState, useEffect  } from 'react'
import axios from 'axios';
import './App.css'
import CourseGraph from './components/CourseGraph';
import Sidebar from './components/sidebar';
import Course from './models/Course'
import DegreeSelectionMenu from './components/DegreeSelectionMenu';
import { extractCoursesFromModules } from './utils/CourseExtractor'


function App() {
  const [courses, setCourses] = useState([]);

  const basePath = process.env.BASE_PATH ? process.env.BASE_PATH: ''

  const axiosInstance = axios.create({
  });

  const fetchCourses = async (degree = null) => {
    try {
      console.log("Fetching courses using degree",degree)
      let response;
      if(degree==null) {
        response = await axiosInstance.get(`${basePath}/api/courses`);
        if(response == null) return;
        setCoursesData(response.data);
        return;
      } 
      
      console.log("fetching courses from degree",degree);
      response = await axiosInstance.get(`${basePath}/api/degrees/search_by_degree_name/?search=${encodeURIComponent("KH50_005")}`); // replace with degree later

      // Debug console command for listing modules and courses

      //temp.data.forEach((module, index) => {
      //  console.log(`Module ${index}:`, module);
      //});

      const extractedCourses = extractCoursesFromModules(response.data);
      console.log("Extracted Courses:", extractedCourses);

      if(extractedCourses == null) return;
      setCoursesData(extractedCourses);
      
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const setCoursesData = (data = null, fromDatabase = null) => {
    if (data==null) {
      console.log("No data to set courses!");
      return;
    } else if (data=="fetch") {
      console.log("fetching");
      fetchCourses();
      return;
    }

    console.log("set course data",data);

    if(fromDatabase) {
      const convertedCourses = data.map(courseData => {
        // Assuming dependencies are official_course_ids of prerequisite courses
        // groupId and type might need to be fetched or set differently as per your new data structure
        // Assuming description will be set or fetched later as mentioned
        return new Course(
          courseData.name,
          courseData.official_course_id, // Assuming this is the unique identifier now
          courseData.kori_name, // Assuming kori_name could be used as groupId if relevant
          courseData.dependencies, // This should be an array of official_course_ids
          "", // Type might need to be determined or fetched as per your application logic
          "" // Description to be fetched/set later as mentioned
        );
      });
      setCourses(convertedCourses);
      return;
    }

    // This is to be removed later. Probably.
    // The description will be fetched from kori API when the sidebar is opened due to retrieving the most up-to-date scheduling, so this implementation will probably change.
    const convertedCourses = data.map(courseData => new Course(courseData.name, courseData.identifier, courseData.groupId, courseData.dependencies, courseData.type, courseData.description));
    setCourses(convertedCourses);
  };

  const fetchDegrees = async () => {
    try {
      const response = await axiosInstance.get(`${basePath}/api/degrees`);
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
    fetchCourses(degree)
  };


  // What is the default degree? This needs to be solved later
  const [degree, setDegree] = useState('TKT 23-26');
  const [listOfDegrees, setDegreeToList] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCourseName, setSelectedCourseName] = useState('');


return (
  <div>
  <CourseGraph
    axiosInstance={axiosInstance}
    courses={courses}
    onCoursesUpdated={setCoursesData}
    setSelectedCourseName={setSelectedCourseName}
    setIsSidebarOpen={setIsSidebarOpen}
  />
  <div className="degree-menu-container">
    <DegreeSelectionMenu
      onDegreeChange={handleDegreeChange} // Assuming you have a handler function for this
      degree={degree}
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
};

export default App;

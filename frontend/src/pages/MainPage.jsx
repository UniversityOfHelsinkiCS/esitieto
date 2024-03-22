import { useState, useEffect } from 'react'
import CourseGraph from '../components/CourseGraph';
import Sidebar from '../components/sidebar';
import Course from '../models/Course'
import DegreeSelectionMenu from '../components/DegreeSelectionMenu';
import Messenger from '../components/messager/MessagerComponent';
import { info, error as displayError } from '../components/messager/messager';
//import { list } from 'postcss'; Unused by eslint, unsure if someone using but nuke otherwise.

const MainPage = ({ axiosInstance }) => {
  const [degree, setDegree] = useState('TKT 23-26');
  const [listOfDegrees, setDegreeToList] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCourseName, setSelectedCourseName] = useState('');
  const [courses, setCourses] = useState([]);

  const fetchCourses = async (degree) => {
    try {
      if(degree == null) {
        displayError("Jokin meni pieleen tutkintotietoja haettaessa!")
        console.error("Degree is null!")
        return;
      }

      let response;
      console.log("Fetching courses from degree", degree);

      response = await axiosInstance.get(`/api/degrees/search_by_degree`, {
        headers: { // HARDCODED INFO, NEEDS FIXING LATER.
          'degree-name': "kh50_005", //degree-name,
          'degree-years': '2023-2026', //degree-year
        }
      });

      if (response == null) {
        displayError("Jokin meni pieleen kurssitietoja haettaessa!");
        console.error("Response is null!")
        return;
      } 

      const convertedCourses = response.data.map(courseData => new Course(courseData.name, courseData.identifier, courseData.groupId, courseData.dependencies, courseData.type, courseData.description));
      setCourses(convertedCourses);
      info("Fetched degree successfully");

    } catch (error) {
      console.error("Error fetching data: ", error);
      displayError("Jokin meni pieleen!");
    }
  };

  const setCoursesData = (data = null, fromDatabase = null) => { // Likely to be nuked soon! But leaving here just in case.
    return;
    /*
    if (data == null) {
      console.log("No data to set courses!");
      return;
    } else if (data === "fetch") {
      console.log("fetching");
      fetchCourses();
      return;
    }

    console.log("set course data", data);

    if (fromDatabase) {
      const convertedCourses = data.map(courseData => {
        // Assuming dependencies are official_course_ids of prerequisite courses
        // groupId and type might need to be fetched or set differently as per your new data structure
        // Assuming description will be set or fetched later as mentioned
        return new Course(
          courseData.name,
          courseData.official_course_id, // Assuming this is the unique identifier now
          courseData.kori_name, // Assuming kori_name could be used as groupId if relevant
          courseData.dependencies, // This should be an array of official_course_ids
          courseData.type,
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
    */
  };

  const fetchDegrees = async () => {
    try {
      const response = await axiosInstance.get(`/api/degrees`);
      if (response == null) {
        displayError("Palvelimelle ei saatu yhteyttä")
        return;
      }
      const convertedDegrees = response.data.map(degreeData => degreeData.degree_name);
      setDegreeToList(convertedDegrees);
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
    fetchCourses(listOfDegrees[0]);
    
  }, [listOfDegrees]);

  const handleDegreeChange = (degree) => {
    console.log("Selected Degree: ", degree);
    setDegree(degree);
    fetchCourses(degree)
  };

  return (
    <div>
      <Messenger />
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
}

export default MainPage;
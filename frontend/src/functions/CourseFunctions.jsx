import { error as displayError } from '../components/messager/messager';

// Add a course to the database
export const addCourse = async (axios, onCoursesUpdated, course_name, official_course_id, kori_name) => {
    //const course_name = prompt("Enter course name:");
    if (!course_name) return;

    //const official_course_id = prompt("Enter official course ID:");
    if (!official_course_id) return;

    //const kori_name = prompt("Enter Kori name:");
    if (!kori_name) return;

    await axios.post('/api/courses/databaseCreateCourse', { official_course_id, course_name, kori_name });
    onCoursesUpdated("fetch");
};

// Remove a course from the database
export const removeCourse = async (axios, onCoursesUpdated, kori_name) => {
    //const kori_name = prompt("Enter Kori name of the course to remove:");
    if (!kori_name) return;

    await axios.delete(`/api/courses/databaseDeleteCourse/${encodeURIComponent(kori_name)}`);
    onCoursesUpdated("fetch");
};

// Fetch a course and it's dependencies from database
// Changed kori_name to come from searchbar search
export const handleSearch = async (axios, onCoursesUpdated, kori_name) => {
    //const kori_name = prompt("Enter Kori name to search for its prerequisites:");
    if (!kori_name) return;

    try {
        const response = await axios.get(`/api/courses/getCourseWithPrerequisites/${encodeURIComponent(kori_name)}`);
        onCoursesUpdated(response.data, "database");
    } catch (error) {
        console.error("Error fetching course with prerequisites: ", error);
    }
};

// Add a dependency to the database between two courses
export const handleAddDependency = async (axios, course_kori_name, prerequisite_course_kori_name) => {
    //const course_kori_name = prompt("Enter the Kori name of the course:");
    if (!course_kori_name) return;

    //const prerequisite_course_kori_name = prompt("Enter the Kori name of the prerequisite course:");
    if (!prerequisite_course_kori_name) return;

    try {
        const response = await axios.post('/api/courses/addPrerequisiteCourse', { course_kori_name, prerequisite_course_kori_name });
        console.log("Dependency added successfully:", response.data);
    } catch (error) {
        console.error("Error adding course dependency: ", error);
    }
};

// Remove a dependency from the database between two courses
export const handleRemoveDependency = async (axios) => {
    const course_kori_name = prompt("Enter the Kori name of the course:");
    if (!course_kori_name) return;

    const prerequisite_course_kori_name = prompt("Enter the Kori name of the prerequisite course to remove:");
    if (!prerequisite_course_kori_name) return;

    try {
        await axios.delete('/api/courses/removePrerequisiteCourse', {
            data: { course_kori_name, prerequisite_course_kori_name }
        });
        console.log("Dependency removed successfully");
    } catch (error) {
        console.error("Error removing course dependency: ", error);
    }
};



export const handleKORIAPITEST = async (axios) => {
    const searchTerm = prompt("Enter search term:");
    if (!searchTerm) return;

    console.log("KORI search: ", searchTerm);

    try {
        const response = await axios.get(`/api/kori/getKori?search=${encodeURIComponent(searchTerm)}`);
        console.log(JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error("Error fetching searched courses: ", error);
    }
};

export const handleFetchKORIByName = async (axios, searchTerm) => {
    console.log("KORI search by name using name: ", searchTerm);

    try {
        const response = await axios.get(`/api/kori/search_by_name?search=${encodeURIComponent(searchTerm)}`);
        //console.log(JSON.stringify(response.data, null, 2)); // Uncomment if you need to see the data
        return response.data
    } catch (error) {
        console.error("Error fetching searched courses: ", error);
        displayError("Ei pystynyt muodostamaan yhteyttä SISUun");
    }
};

export const handleFetchKORICourseInfo = async (axios, searchTerm) => {
    console.log("KORI get course info using groupId: ", searchTerm);

    try {
        const response = await axios.get(`/api/kori/get_info_by_name?search=${encodeURIComponent(searchTerm)}`);
        console.log(JSON.stringify(response.data, null, 2)); // Uncomment if you need to see the data
        return response.data
    } catch (error) {
        console.error("Error fetching searched courses: ", error);
    }
};

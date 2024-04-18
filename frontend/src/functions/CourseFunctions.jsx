import { error as displayError } from '../components/messager/messager';

// Add a course to the database
export const addCourse = async (axios, onCoursesUpdated, course_name, official_course_id, kori_name) => {
    // Unused, old code that is no longer functional. These are connected to the edit window buttons if you wish to continue working from there.
};

// Remove a course from the database
export const removeCourse = async (axios, onCoursesUpdated, kori_name) => {
    // Unused, old code that is no longer functional. These are connected to the edit window buttons if you wish to continue working from there.
};

// Add a dependency to the database between two courses
export const handleAddDependency = async (axios, course_kori_name, prerequisite_course_kori_name) => {
    // Unused, old code that is no longer functional. These are connected to the edit window buttons if you wish to continue working from there.
};

// Remove a dependency from the database between two courses
export const handleRemoveDependency = async (axios) => {
    // Unused, old code that is no longer functional. These are connected to the edit window buttons if you wish to continue working from there.
};

export const handleKORIAPITEST = async (axios) => {
    // Unused, old code that is no longer functional. These are connected to the edit window buttons if you wish to continue working from there.
};

export const handleFetchKORIByName = async (axios, searchTerm) => {
    console.log("KORI search by name using name: ", searchTerm);

    try {
        const response = await axios.get(`/api/kori/search_by_name?search=${encodeURIComponent(searchTerm)}`);
        //console.log(JSON.stringify(response.data, null, 2)); // Uncomment if you need to see the data
        return response.data
    } catch (error) {
        console.error("Error fetching searched courses from KORI:", error);
        displayError("Kurssitietoja ei saatu haettua");
    }
};

export const handleFetchKORICourseInfo = async (axios, searchTerm) => {
    console.log("KORI get course info using groupId: ", searchTerm);

    try {
        const response = await axios.get(`/api/kori/get_info_by_id?search=${encodeURIComponent(searchTerm)}`);
        // console.log(JSON.stringify(response.data, null, 2)); // Uncomment if you need to see the data
        return response.data
    } catch (error) {
        console.error("Error fetching searched courses: ", error);
    }
};

export const addCourse = async (axios, onCoursesUpdated) => {
    const course_name = prompt("Enter course name:");
    if (!course_name) return;

    const official_course_id = prompt("Enter official course ID:");
    if (!official_course_id) return;

    const kori_name = prompt("Enter Kori name:");
    if (!kori_name) return;

    await axios.post('/api/courses/databaseCreateCourse', { official_course_id, course_name, kori_name });
    onCoursesUpdated("fetch");
};

export const removeCourse = async (axios, onCoursesUpdated) => {
    const kori_name = prompt("Enter Kori name of the course to remove:");
    if (!kori_name) return;

    await axios.delete(`/api/courses/databaseDeleteCourse/${encodeURIComponent(kori_name)}`);
    onCoursesUpdated("fetch");
};

export const handleSearch = async (axios, onCoursesUpdated) => {
    const kori_name = prompt("Enter Kori name to search for its prerequisites:");
    if (!kori_name) return;

    try {
        const response = await axios.get(`/api/courses/getCourseWithPrerequisites/${encodeURIComponent(kori_name)}`);
        onCoursesUpdated(response.data, "database");
    } catch (error) {
        console.error("Error fetching course with prerequisites: ", error);
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

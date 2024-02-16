export const addCourse = async (axios, onCoursesUpdated) => {
    const name = prompt("Enter course name:");
    if (!name) return;

    const identifier = prompt("Enter course identifier:");
    if (!identifier) return;

    const dependencies = prompt("Enter course dependencies (comma-separated):").split(",");
    if (!dependencies) return;

    const type = prompt("Enter course type:");
    if (!type) return;

    await axios.post('/api/courses/add', { name, identifier, dependencies, type });
    onCoursesUpdated("fetch");
};

export const removeCourse = async (axios, onCoursesUpdated) => {
    const identifier = prompt("Enter course identifier to remove:");
    if (!identifier) return;

    await axios.delete('/api/courses/remove', { data: { identifier } });
    onCoursesUpdated("fetch");
};

export const handleSearch = async (axios, onCoursesUpdated) => {
    const searchTerm = prompt("Enter search term:");
    if (!searchTerm) return;

    try {
        const response = await axios.get(`/api/courses/search?term=${encodeURIComponent(searchTerm)}`);
        onCoursesUpdated(response.data);
    } catch (error) {
        console.error("Error fetching searched courses: ", error);
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

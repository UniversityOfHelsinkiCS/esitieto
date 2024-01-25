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
    onCoursesUpdated();
};

export const removeCourse = async (axios, onCoursesUpdated) => {
    const identifier = prompt("Enter course identifier to remove:");
    if (!identifier) return;

    await axios.delete('/api/courses/remove', { data: { identifier } });
    onCoursesUpdated();
};

import { error as displayError } from '../components/messager/messager';

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

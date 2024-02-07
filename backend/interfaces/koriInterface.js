
class KoriInterface {
    /*
    Interface to communicate with KORI API.

    Methods:
    courseInfo - Used to get full info of a specific course.
    
    searchCourses - Used to list all courses that contain the <search> string.
    */
    #requestOptions
    
    constructor() {
        this.#requestOptions = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
            mode: 'cors',
            cache: 'no-cache',
        };
    }
  
    isValidInput(input) {
        /*Accepts numbers letters and dashes*/
        //var pattern = /^[a-zA-Z0-9\-]+$/;
        var pattern = /^[a-zA-Z0-9\-]+( [a-zA-Z0-9\-]+)*$/;
  
        return pattern.test(input);
    }
  
    async courseInfo(id) {
        /*
        Get the course info using <id> which should be the course groupId.

        Return the course info in JSON format.
        */
        if (this.isValidInput(id)) {
            const apiUrl = 'https://sisu.helsinki.fi/kori/api/course-units?groupId='.concat(encodeURIComponent(id));
            return fetch(apiUrl, this.#requestOptions)
            .then(response => {
            return response.json();
            }).then(data => {
            return data
            
            }).catch(error => {
            console.error('Fetch error:', error.message);
            });
        } else {
            return "Virheellinen syöte"
        }
    }

    async searchCourses(search) {
        /*
        List max 200 courses that contain the <search> string.

        Returns list of courses in JSON format.
        */
        if (this.isValidInput(search)) {
            const apiUrl = 'https://sisu.helsinki.fi/kori/api/course-unit-search?fullTextQuery='.concat(encodeURIComponent(search)).concat('&limit=200&universityOrgId=hy-university-root-id');
            return fetch(apiUrl, this.#requestOptions)
            .then(response => {
            return response.json();
            }).then(data => {
            return data
            
            }).catch(error => {
            console.error('Fetch error:', error.message);
            });
        } else {
            return "Virheellinen syöte"
        }
    }
}

module.exports = KoriInterface;

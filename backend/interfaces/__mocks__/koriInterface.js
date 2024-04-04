
class KoriInterface {
    /*
    MOCK Interface to communicate with KORI API.

    Methods:
    courseInfo - Used to get full info of a specific course.
    
    searchCourses - Used to list all courses that contain the <search> string.
    */
  
    isValidInput(input) {
        // This regex accepts numbers, letters (including Unicode letters), dashes, colons, underscores,
        // commas, and allows spaces between words.
        var pattern = /^[\p{L}0-9-:,_]+( [\p{L}0-9-:,_]+)*$/u;
  
        return pattern.test(input);
    }
  
    async courseInfo(id, hyYearCode='hy-lv-74') {
        /*
        Get the course info using <id> which should be the course groupId. Gives the <hyYearCode> implementation of the course.

        Return the course info in JSON format.
        */
        if (this.isValidInput(id)) {
            return {
                "kurssi": "tkt10002",
                "nimi": "ohjelmoinnin perusteet"
            }
        } else {
            return "Virheellinen syöte"
        }
    }

    async searchCourses(search, hyYearCode='hy-lv-74') {
        /*
        Lists max 200 courses that contain the <search> string. Gives the <hyYearCode> implementation of the courses.

        Returns list of courses in JSON format.
        */
        if (this.isValidInput(search)) {
            return {
                "kurssi1": "tkt10002",
                "kurssi2": "tkt10003",
                "kurssi3": "tkt10004"
            }
        } else {
            return "Virheellinen syöte"
        }
    }
}

module.exports = KoriInterface;

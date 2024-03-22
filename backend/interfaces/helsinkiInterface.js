
class HelsinkiInterface {
    /*
    Interface to communicate with helsinki.fi APIs.

    Methods:
    degreeStructure - Gets degree structure using degree code
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
        /*Accepts numbers letters underscores and dashes*/
        //var pattern = /^[\p{L}0-9_-]+( [\p{L}0-9_-]+)*$/u;

        // This regex now also accepts colons, in addition to numbers, letters (including Unicode letters like ä, ö, å), dashes, and spaces between words.
        var pattern = /^[\p{L}0-9-:]+( [\p{L}0-9-:]+)*$/u;
  
        return pattern.test(input);
    }

    async getlvNames() {
        /*
        Gets list of "lv_names" Academic year codes.

        Returns the list of lv_names in JSON format.
        */
        const apiUrl = 'https://od.helsinki.fi/eduviewer/lv_names';
        return fetch(apiUrl, this.#requestOptions)
        .then(response => {
        return response.json();

        }).then(data => {
        return data

        }).catch(error => {
        console.error('Fetch error:', error.message);
        });

    }
  
    async degreeStructure(id, lvName='hy-lv-74') {
        /*
        Gets the degree structure using <id> which should be the degree code.
        Shows the <period> specific structure.

        Returns the selected periods degree stucture in JSON format.
        */
        if (this.isValidInput(id) && this.isValidInput(lvName)) {
            const apiUrl = 'https://od.helsinki.fi/eduviewer/tree_by_code/'.concat(encodeURIComponent(id)).concat('?lv=').concat(lvName);
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

module.exports = HelsinkiInterface;

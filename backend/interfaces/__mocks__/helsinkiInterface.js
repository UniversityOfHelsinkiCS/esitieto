
class HelsinkiInterface {
    /*
    MOCK Interface to communicate with helsinki.fi APIs.

    Methods:
    degreeStructure - Gets degree structure using degree code
    */
  
    isValidInput(input) {
        /*Accepts numbers letters underscores and dashes*/
        //var pattern = /^[\p{L}0-9_-]+( [\p{L}0-9_-]+)*$/u;

        // This regex accepts numbers, letters (including Unicode letters), dashes, colons, underscores,
        // commas, and allows spaces between words.
        var pattern = /^[\p{L}0-9-:,_]+( [\p{L}0-9-:,_]+)*$/u;
  
        return pattern.test(input);
    }

    async getlvNames() {
        /*
        Gets list of "lv_names" Academic year codes.

        Returns the list of lv_names in JSON format.
        */
        return {
            "hy-lv-1": "1950-51",
            "hy-lv-2": "1951-52",
            "hy-lv-3": "1952-53",
            "hy-lv-4": "1953-54",
            "hy-lv-5": "1954-55",
            "hy-lv-6": "1955-56",
            "hy-lv-7": "1956-57",
            "hy-lv-8": "1957-58",
            "hy-lv-9": "1958-59",
            "hy-lv-10": "1959-60",
            "hy-lv-11": "1960-61",
            "hy-lv-12": "1961-62",
            "hy-lv-13": "1962-63",
            "hy-lv-14": "1963-64",
            "hy-lv-15": "1964-65",
            "hy-lv-16": "1965-66",
            "hy-lv-17": "1966-67",
            "hy-lv-18": "1967-68",
            "hy-lv-19": "1968-69",
            "hy-lv-20": "1969-70",
            "hy-lv-21": "1970-71",
            "hy-lv-22": "1971-72",
            "hy-lv-23": "1972-73",
            "hy-lv-24": "1973-74",
            "hy-lv-25": "1974-75",
            "hy-lv-26": "1975-76",
            "hy-lv-27": "1976-77",
            "hy-lv-28": "1977-78",
            "hy-lv-29": "1978-79",
            "hy-lv-30": "1979-80",
            "hy-lv-31": "1980-81",
            "hy-lv-32": "1981-82",
            "hy-lv-33": "1982-83",
            "hy-lv-34": "1983-84",
            "hy-lv-35": "1984-85",
            "hy-lv-36": "1985-86",
            "hy-lv-37": "1986-87",
            "hy-lv-38": "1987-88",
            "hy-lv-39": "1988-89",
            "hy-lv-40": "1989-90",
            "hy-lv-41": "1990-91",
            "hy-lv-42": "1991-92",
            "hy-lv-43": "1992-93",
            "hy-lv-44": "1993-94",
            "hy-lv-45": "1994-95",
            "hy-lv-46": "1995-96",
            "hy-lv-47": "1996-97",
            "hy-lv-48": "1997-98",
            "hy-lv-49": "1998-99",
            "hy-lv-50": "1999-00",
            "hy-lv-51": "2000-01",
            "hy-lv-52": "2001-02",
            "hy-lv-53": "2002-03",
            "hy-lv-54": "2003-04",
            "hy-lv-55": "2004-05",
            "hy-lv-56": "2005-06",
            "hy-lv-57": "2006-07",
            "hy-lv-58": "2007-08",
            "hy-lv-59": "2008-09",
            "hy-lv-60": "2009-10",
            "hy-lv-61": "2010-11",
            "hy-lv-62": "2011-12",
            "hy-lv-63": "2012-13",
            "hy-lv-64": "2013-14",
            "hy-lv-65": "2014-15",
            "hy-lv-66": "2015-16",
            "hy-lv-67": "2016-17",
            "hy-lv-68": "2017-18",
            "hy-lv-69": "2018-19",
            "hy-lv-70": "2019-20",
            "hy-lv-71": "2020-21",
            "hy-lv-72": "2021-22",
            "hy-lv-73": "2022-23",
            "hy-lv-74": "2023-24",
            "hy-lv-75": "2024-25",
            "hy-lv-76": "2025-26",
            "hy-lv-77": "2026-27",
            "hy-lv-78": "2027-28"
        }

    }
  
    async degreeStructure(id, lvName='hy-lv-74') {
        /*
        Gets the degree structure using <id> which should be the degree code.
        Shows the <period> specific structure.

        Returns the selected periods degree stucture in JSON format.
        */
        if (this.isValidInput(id) && this.isValidInput(lvName)) {
            return {
                "tutkinto": "kh50_005",
                "lyhenne": "tkt",
                "nimi": "Tietojenkäsittelytieteen kandi"
            }
        } else {
            return "Virheellinen syöte"
        }
    }


}

module.exports = HelsinkiInterface;

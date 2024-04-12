import React from 'react';
import axios from 'axios';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';

describe("SearchBar unit testing", () => {
    jest.mock('axios')
    // const mockFetchDatabaseSearchSuggestions = jest.fn();
    const mockAxiosInstance = jest.fn()
    const mockHandleSearch = jest.fn()

    test("New text in textfield calls the onChange function", async () => {
         axios.get = jest.fn().mockResolvedValueOnce({
            data:
            [{
            "id": 1,
            "kori_id": "hy-CU-117375413",
            "course_name": "Raja-arvot",
            "hy_course_id": "MAT11003"
          },
          {
            "id": 2,
            "kori_id": "hy-CU-117375394",
            "course_name": "Lineaarialgebra ja matriisilaskenta I",
            "hy_course_id": "MAT11002"
          }]
        });
        
        jest.spyOn(React, 'useEffect').mockImplementationOnce(f => f());

        const {getByLabelText} = render(<SearchBar axiosInstance={mockAxiosInstance} handleSearch={mockHandleSearch}/>);

        //await mockFetchDatabaseSearchSuggestions(mockAxiosInstance);

        const textfield = getByLabelText("Search courses")
        fireEvent.change(textfield, {target:{value:'test text'}});
        expect(handleChange).toHaveBeenCalledWith('test text'); // eslint-disable-line <------------- Remove this comment after fixing the error with this line. handleChange is not defined.
    })

})
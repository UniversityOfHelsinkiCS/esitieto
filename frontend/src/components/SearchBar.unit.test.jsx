import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';


describe("SearchBar unit testing", () => {
  const mockCourses = [
    {
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
  }];
  const mockFetchDatabaseSearchSuggestions = jest.fn().mockResolvedValue(mockCourses)
  const mockHandleSearch = jest.fn()
  const mockHandleChange = jest.fn()


    test("New text in textfield calls the onChange function", async () => {
        const {getByLabelText} = render(
        <SearchBar 
        axiosInstance={{}} 
        handleSearch={mockHandleSearch} 
        fetchDatabaseSearchSuggestions={mockFetchDatabaseSearchSuggestions}
        handleChange={mockHandleChange}/>);

        const textfield = getByLabelText("Search courses")
        fireEvent.change(textfield, {target:{value:'test text'}});
        expect(mockHandleChange).toHaveBeenCalledWith('test text');
    })

})
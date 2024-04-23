import axiosMock from 'axios';
import React from 'react';
import {render, /*fireEvent*/ screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar.jsx';
import { act } from 'react-dom/test-utils';

jest.mock('axios');

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
  const mockHandleSearch = jest.fn();
  const mockHandleChange = jest.fn();

  beforeEach(() => {
    axiosMock.get.mockResolvedValueOnce({data: mockCourses});
  });

  test("The SearchBar renders properly", async() => {
    await act(async() => {render(
      <SearchBar 
        axiosInstance={axiosMock} 
        handleSearch={mockHandleSearch}
        handleChange={mockHandleChange}
      />
    );
  });

  //Textfield
  const textField = screen.getByText('Hae kurssi:');
  expect(textField).toBeInTheDocument();
  });
  
  test("Courses are fetched when SearchBar is rendered", async () => {
    await act(async() => {render(
      <SearchBar 
        axiosInstance={axiosMock} 
        handleSearch={mockHandleSearch}
        handleChange={mockHandleChange}
      />);
    await waitFor(() => expect(axiosMock.get).toHaveBeenCalledTimes(1));
  });
  });

  // The test below doesn't work  
  /*
  test("New text in textfield calls the onChange function", async () => {
    let textfield = ''
    act(() => {
      const {getByTestId} =
      render(
      <SearchBar 
      axiosInstance={axiosMock} 
      handleSearch={mockHandleSearch}
      handleChange={mockHandleChange}/>
      );
      textfield = getByTestId("testTextField");
    })
    console.log("value start", textfield.value);
    fireEvent.change(textfield, {target:{value:'banana'}});
    console.log("value end", textfield.value);

    await waitFor(() => {
      expect(mockHandleChange).toHaveBeenCalledWith('banana');
    });
  });
  */ 
});
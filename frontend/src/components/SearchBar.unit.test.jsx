import axiosMock from 'axios';
import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar.jsx';

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
    }
  ];
  
  const mockHandleSearch = jest.fn();
  const mockHandleChange = jest.fn();

  beforeEach(() => {
    axiosMock.get.mockResolvedValueOnce({ data: mockCourses });
    jest.clearAllMocks();
  });

  test("The SearchBar renders properly", async () => {
    await act(async () => {
      render(
        <SearchBar 
          axiosInstance={axiosMock} 
          handleSearch={mockHandleSearch}
          handleChange={mockHandleChange}
        />
      );
    });

    const textField = screen.getByText('Hae kurssi:');
    expect(textField).toBeInTheDocument();
  });

  test("Courses are fetched when SearchBar is rendered", async () => {
    await act(async () => {
      render(
        <SearchBar 
          axiosInstance={axiosMock} 
          handleSearch={mockHandleSearch}
          handleChange={mockHandleChange}
        />
      );
    });

    await waitFor(() => expect(axiosMock.get).toHaveBeenCalledTimes(1));
  });

  test("Text input changes correctly", async () => {
    await act(async () => {
      render(
        <SearchBar 
          axiosInstance={axiosMock} 
          handleSearch={mockHandleSearch}
          handleChange={mockHandleChange}
        />
      );
    });

    const input = screen.getByRole('combobox');
    fireEvent.click(input);
    fireEvent.change(input, { target: { value: 'Raja-arvot' } });
    await waitFor(() => expect(input).toHaveValue('Raja-arvot'));
  });
  
  test("Course selection triggers handleSelect correctly", async () => {
    await act(async () => {
      render(
        <SearchBar 
          axiosInstance={axiosMock} 
          handleSearch={mockHandleSearch}
          handleChange={mockHandleChange}
        />
      );
    });

    const input = screen.getByRole('combobox');
    fireEvent.click(input);
    fireEvent.change(input, { target: { value: 'Raja-arvot' } });

    const option = await screen.findByText((content, element) => {
      return element.tagName.toLowerCase() === 'li' && content.includes('Raja-arvot');
    });
    fireEvent.click(option);

    await waitFor(() => expect(mockHandleSearch).toHaveBeenCalledWith('MAT11003'));
  });
});



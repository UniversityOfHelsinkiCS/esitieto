import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';

describe("SearchBar unit testing", () => {
    const mockAxiosInstance = jest.fn()
    const mockHandleSearch = jest.fn()

    test("New text in textfield calls the onChange function", () => {
        const {getByLabelText} = render(<SearchBar axiosInstance={mockAxiosInstance} handleSearch={mockHandleSearch}/>)
        const textfield = getByLabelText("Search courses")
        fireEvent.change(textfield, {target:{value:'test text'}})
        expect(handleChange).toHaveBeenCalledWith('test text')
    })

})
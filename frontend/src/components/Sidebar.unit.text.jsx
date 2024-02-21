import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from './Sidebar'; // Adjust the import path as necessary
import * as CourseFunctions from './CourseFunctions'; // Import the module to mock its functions

// Mock the CourseFunctions module
jest.mock('./CourseFunctions', () => ({
    handleFetchKORIByName: jest.fn(),
    handleFetchKORICourseInfo: jest.fn(),
}));

// Mocked response for handleFetchKORIByName
const mockedCourseByNameResponse = [{
    groupId: 'testGroupId',
    activityPeriods: [
        { startDate: '2024-01-01', endDate: '2024-02-01' },
        // Add more periods as needed
    ],
}];

// Mocked response for handleFetchKORICourseInfo
const mockedCourseInfoResponse = [{
    outcomes: { fi: 'Test course outcomes' },
    credits: { max: 5 },
    groupId: 'testCode',
}];

describe('Sidebar Component Tests', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    test('renders Sidebar when open', () => {
        render(<Sidebar isOpen={true} closeSidebar={() => { }} selectedCourseName="Test Course" axiosInstance={{}} />);
        expect(screen.getByText('Test Course')).toBeInTheDocument();
    });

    test('does not render Sidebar when not open', () => {
        const { container } = render(<Sidebar isOpen={false} closeSidebar={() => { }} selectedCourseName="Test Course" axiosInstance={{}} />);
        expect(container.firstChild).toBeNull();
    });

    test('fetches course information on open', async () => {
        // Setup mock function responses
        CourseFunctions.handleFetchKORIByName.mockResolvedValue(mockedCourseByNameResponse);
        CourseFunctions.handleFetchKORICourseInfo.mockResolvedValue(mockedCourseInfoResponse);

        render(<Sidebar isOpen={true} closeSidebar={() => { }} selectedCourseName="Test Course" axiosInstance={{}} />);

        // Wait for the async functions to complete
        await waitFor(() => expect(CourseFunctions.handleFetchKORIByName).toHaveBeenCalled());
        await waitFor(() => expect(CourseFunctions.handleFetchKORICourseInfo).toHaveBeenCalled());

        // Check if course details are rendered
        expect(screen.getByText(/My credits is worth: 5/)).toBeInTheDocument();
        expect(screen.getByText(/My code is: testCode/)).toBeInTheDocument();
    });

    // Add more tests as needed
});

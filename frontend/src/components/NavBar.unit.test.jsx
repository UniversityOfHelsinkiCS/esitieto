import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './Navbar';

// Mock the subcomponents
jest.mock('./SearchBar', () => () => <div>SearchBar</div>);
jest.mock('./InfoBox', () => ({ isOpen, onClose, baseURL }) => (
  <div>
    {isOpen ? 'InfoBox is open' : 'InfoBox is closed'}
    <button onClick={onClose}>Close</button>
  </div>
));
jest.mock('./DegreeSelectionMenu', () => () => <div>DegreeSelectionMenu</div>);
jest.mock('./InfoButton', () => ({ onClick }) => (
  <button onClick={onClick}>InfoButton</button>
));

// Mock process.env
beforeAll(() => {
  process.env.VITE_BASE_URL = 'http://localhost:3000';
});

describe('Navbar', () => {
  const mockHandleDegreeChange = jest.fn();
  const mockHandleSearch = jest.fn();
  const mockAxiosInstance = {};
  const mockBaseURL = 'http://example.com';
  const mockSelectedDegreeName = 'Test Degree';
  const mockListOfDegrees = ['Degree 1', 'Degree 2'];

  test('renders all components', () => {
    render(
      <Navbar
        handleDegreeChange={mockHandleDegreeChange}
        listOfDegrees={mockListOfDegrees}
        axiosInstance={mockAxiosInstance}
        handleSearch={mockHandleSearch}
        baseURL={mockBaseURL}
        selectedDegreeName={mockSelectedDegreeName}
      />
    );

    // Check if all components are rendered
    expect(screen.getByText('SearchBar')).toBeInTheDocument();
    expect(screen.getByText('DegreeSelectionMenu')).toBeInTheDocument();
    expect(screen.getByText('InfoButton')).toBeInTheDocument();
    expect(screen.getByText('InfoBox is closed')).toBeInTheDocument();
    expect(screen.getByText(mockSelectedDegreeName)).toBeInTheDocument();
  });

  test('toggles InfoBox visibility when InfoButton is clicked', () => {
    render(
      <Navbar
        handleDegreeChange={mockHandleDegreeChange}
        listOfDegrees={mockListOfDegrees}
        axiosInstance={mockAxiosInstance}
        handleSearch={mockHandleSearch}
        baseURL={mockBaseURL}
        selectedDegreeName={mockSelectedDegreeName}
      />
    );

    // Initially, the InfoBox should be closed
    expect(screen.getByText('InfoBox is closed')).toBeInTheDocument();

    // Click the InfoButton to open the InfoBox
    fireEvent.click(screen.getByText('InfoButton'));
    expect(screen.getByText('InfoBox is open')).toBeInTheDocument();

    // Click the Close button to close the InfoBox
    fireEvent.click(screen.getByText('Close'));
    expect(screen.getByText('InfoBox is closed')).toBeInTheDocument();
  });
});

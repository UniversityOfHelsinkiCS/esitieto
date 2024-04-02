import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from './sidebar';
import * as CourseFunctions from '../functions/CourseFunctions';

jest.mock('../functions/CourseFunctions', () => ({
  handleFetchKORIByName: jest.fn(),
  handleFetchKORICourseInfo: jest.fn(),
}));

describe('Sidebar Component Tests', () => {
  const mockCloseSidebar = jest.fn();
  const mockAxiosInstance = {};

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when isOpen is true', () => {
    render(<Sidebar isOpen={true} closeSidebar={mockCloseSidebar} selectedCourseName="Testi kurssi" axiosInstance={mockAxiosInstance} />);
    expect(screen.getByText('X')).toBeInTheDocument();
    expect(screen.getByText('Testi kurssi')).toBeInTheDocument();
  });

  it('fetches course information', async () => {
    const mockCourseInfo = { groupId: '123', outcomes: { fi: ['Testi kuvaus'] }, credits: { max: 5 }, additional: { fi: 'Järjestämisajankohta Testi kuvaus Opintokokonaisuus' }, code: 'TKT123'};
    CourseFunctions.handleFetchKORIByName.mockResolvedValueOnce([{ groupId: '123', activityPeriods: [] }]);
    CourseFunctions.handleFetchKORICourseInfo.mockResolvedValueOnce([mockCourseInfo]);

    render(<Sidebar isOpen={true} closeSidebar={mockCloseSidebar} selectedCourseName="Testi kurssi" axiosInstance={mockAxiosInstance} />);
    await waitFor(() => expect(CourseFunctions.handleFetchKORIByName).toHaveBeenCalledWith(mockAxiosInstance, 'Testi kurssi'));
    await waitFor(() => expect(CourseFunctions.handleFetchKORICourseInfo).toHaveBeenCalledWith(mockAxiosInstance, '123'));
  });

  it('handles course description button click', async () => {
    render(<Sidebar isOpen={true} closeSidebar={mockCloseSidebar} selectedCourseName="Testi kurssi" axiosInstance={mockAxiosInstance} />);
    fireEvent.click(screen.getByText('Kurssin kuvaus'));
    await waitFor(() => expect(screen.getByText('Kurssin kuvaus')).toBeInTheDocument());
  });
});

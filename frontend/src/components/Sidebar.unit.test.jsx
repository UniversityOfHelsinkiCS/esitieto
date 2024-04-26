import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
  const mockCourseInfo = { groupId: '123', outcomes: { fi: ['Testi kuvaus'] }, credits: { max: 5 }, additional: { fi: 'Järjestämisajankohta Testi kuvaus Opintokokonaisuus' }, code: 'TKT123', id: ''};
  CourseFunctions.handleFetchKORICourseInfo.mockResolvedValue([mockCourseInfo]);


  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when isOpen is true', () => {
    render(<Sidebar isOpen={true} closeSidebar={mockCloseSidebar} selectedCourseName="Testi kurssi" axiosInstance={mockAxiosInstance} />);
    expect(screen.getByText('X')).toBeInTheDocument();
    expect(screen.getByText('Testi kurssi')).toBeInTheDocument();
  });

  it('fetches course information', async () => {
    render(<Sidebar isOpen={true} closeSidebar={mockCloseSidebar} selectedCourseName="Testi kurssi" selectedCourseGroupID="123" axiosInstance={mockAxiosInstance} />);
    await waitFor(() => expect(CourseFunctions.handleFetchKORICourseInfo).toHaveBeenCalledWith(mockAxiosInstance, '123'));
  });
});

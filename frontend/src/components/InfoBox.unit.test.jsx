import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InfoBox from './InfoBox';
import { MemoryRouter } from 'react-router-dom';

// Mocking useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('InfoBox', () => {
  test('does not render when isOpen is false', () => {
    const onCloseMock = jest.fn();
    const { queryByText } = render(<InfoBox isOpen={false} onClose={onCloseMock} baseURL="/" />, { wrapper: MemoryRouter });
    expect(queryByText('Kurssin esitietojen visualisointityökalu')).toBeNull();
  });

  test('renders when isOpen is true', () => {
    const onCloseMock = jest.fn();
    const { getByText } = render(<InfoBox isOpen={true} onClose={onCloseMock} baseURL="/" />, { wrapper: MemoryRouter });
    expect(getByText('Kurssin esitietojen visualisointityökalu')).toBeInTheDocument();
  });

  test('calls onClose when Sulje button is clicked', () => {
    const onCloseMock = jest.fn();
    const { getByText } = render(<InfoBox isOpen={true} onClose={onCloseMock} baseURL="/" />, { wrapper: MemoryRouter });
    fireEvent.click(getByText('Sulje'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('prompts for password and navigates on correct password', () => {
    const onCloseMock = jest.fn();
    const navigateMock = jest.fn();
    
    jest.spyOn(window, 'prompt').mockImplementation(() => 'guaqamole on parempi');
    const useNavigateMock = require('react-router-dom').useNavigate;
    useNavigateMock.mockImplementation(() => navigateMock);
    
    const { getByText } = render(<InfoBox isOpen={true} onClose={onCloseMock} baseURL="/" />, { wrapper: MemoryRouter });
    fireEvent.click(getByText('Dev portaali'));
    
    expect(window.prompt).toHaveBeenCalledWith('Anna salasana:');
    expect(navigateMock).toHaveBeenCalledWith('/secret');
  });

  test('prompts for password and alerts on wrong password', () => {
    const onCloseMock = jest.fn();
    window.alert = jest.fn();
    
    jest.spyOn(window, 'prompt').mockImplementation(() => 'wrong password');
    
    const { getByText } = render(<InfoBox isOpen={true} onClose={onCloseMock} baseURL="/" />, { wrapper: MemoryRouter });
    fireEvent.click(getByText('Dev portaali'));
    
    expect(window.prompt).toHaveBeenCalledWith('Anna salasana:');
    expect(window.alert).toHaveBeenCalledWith('Väärä salasana');
  });
});

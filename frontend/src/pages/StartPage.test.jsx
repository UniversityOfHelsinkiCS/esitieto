import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import StartPage from './StartPage';

// Mock the window.location object
const { location } = window;

beforeAll(() => {
  delete window.location;
  window.location = { href: '' };
});

afterAll(() => {
  window.location = location;
});

describe('StartPage', () => {
  test('renders StartPage component with correct elements', () => {
    render(<StartPage />);

    expect(screen.getByText('Kurssin esitietojen visualisointityökalu')).toBeInTheDocument();
    expect(screen.getByText('Tämä sovellus näyttää tarvittavat kurssiesitiedot tietyille tutkinto-ohjelmille Helsingin yliopistossa.')).toBeInTheDocument();
  });

  test('handles "Jatka kirjautumatta" button click', () => {
    render(<StartPage />);

    fireEvent.click(screen.getByText('Jatka kirjautumatta'));
    expect(window.location.href).toContain('public');
  });

  test('handles "Kirjaudu sisään" button click', () => {
    render(<StartPage />);

    fireEvent.click(screen.getByText('Kirjaudu sisään'));
    expect(window.location.href).toBe(import.meta.env.BASE_URL);
  });
});
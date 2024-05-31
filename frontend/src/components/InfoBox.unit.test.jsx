import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom'; 
import { InfoBox } from './InfoBox';

describe('InfoBox', () => {
  test('does not render when isOpen is false', () => {
    const onCloseMock = jest.fn();
    const { queryByText } = render(
      <MemoryRouter>
        <InfoBox isOpen={false} onClose={onCloseMock} />
      </MemoryRouter>
    );
    expect(queryByText('Kurssin esitietojen visualisointityökalu')).toBeNull();
  });

  test('renders when isOpen is true', () => {
    const onCloseMock = jest.fn();
    const { getByText } = render(
      <MemoryRouter>        
        <InfoBox isOpen={true} onClose={onCloseMock} />
      </MemoryRouter>
    );
    expect(getByText('Sulje')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    const onCloseMock = jest.fn();
    const { getByText } = render(
      <MemoryRouter>
        <InfoBox isOpen={true} onClose={onCloseMock} />
      </MemoryRouter>
    );
    fireEvent.click(getByText('Sulje'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DegreeSelectionMenu from './DegreeSelectionMenu'; 

describe('DegreeSelectionMenu', () => {
  const mockOnDegreeChange = jest.fn();
  const listOfDegrees = ['TKT 23-26', 'TKT 20-23', 'TKT 17-20'];
  const degree = listOfDegrees[0];


  beforeEach(() => {
    render(<DegreeSelectionMenu onDegreeChange={mockOnDegreeChange} degree={degree} listOfDegrees={listOfDegrees} />);
  });

  it('renders button with initial degree', () => {
    expect(screen.getByRole('button', { name: degree })).toBeInTheDocument();
  });

  it('degree menu is initially not open', () => {
    const button = screen.getByRole('button', { name: degree });
    expect(button).not.toHaveAttribute('aria-expanded', 'true');
  });

  it('opens menu and displays all degree options', () => {
    fireEvent.click(screen.getByRole('button', { name: degree }));
    expect(screen.getByText(listOfDegrees[1])).toBeInTheDocument();
    expect(screen.getByText(listOfDegrees[2])).toBeInTheDocument();
  });

  it('calls onDegreeChange with selected degree and closes menu', () => {
    const button = screen.getByRole('button', { name: degree });
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(screen.getByText(listOfDegrees[1]));
    expect(mockOnDegreeChange).toHaveBeenCalledWith(listOfDegrees[1]);
    expect(button).not.toHaveAttribute('aria-expanded', 'true');
  });
});



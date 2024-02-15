
import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DegreeSelectionMenu from './DegreeSelectionMenu';


describe('DegreeSelectionMenu', () => {
  const listOfDegrees = ['TKT 23-26', 'TKT 20-23', 'TKT 17-20'];
  const mockOnDegreeChange = vi.fn();

  it('opens the menu on button click with default button text', async () => {
    render(<DegreeSelectionMenu onDegreeChange={mockOnDegreeChange} degree={'TKT 23-26'} listOfDegrees={listOfDegrees} />);
    const button = screen.getByRole('button', { name: 'TKT 23-26' });
    fireEvent.click(button);
    const menu = screen.getByRole('menu', { id: 'degree-menu' });
    expect(menu).toBeTruthy();
    fireEvent.click(button)
  });

  it('closes the menu on button click', () => {
    render(<DegreeSelectionMenu onDegreeChange={mockOnDegreeChange} degree={'TKT 23-26'} listOfDegrees={listOfDegrees} id:viewId />);
    const button = screen.getByRole('button', { name: 'TKT 23-26' });
    fireEvent.click(button);
    const menu = screen.getByRole('menu', { id: 'degree-menu' });
    expect(menu).toBeTruthy();
    fireEvent.click(button);
    expect(menu).toBeTruthy();
  });

  it('selects a different degree on button click', () => {
    render(<DegreeSelectionMenu onDegreeChange={mockOnDegreeChange} degree={'TKT 23-26'} listOfDegrees={listOfDegrees} />);
    const button = screen.getByRole('button', { name: 'TKT 23-26' });
    fireEvent.click(button);
    const menu = screen.getByRole('menu', { id: 'degree-menu' });
    expect(menu).toBeTruthy();
    const newDegreeButton = screen.getByRole('menuitem', { name: 'TKT 20-23' });
    fireEvent.click(newDegreeButton);
    expect(mockOnDegreeChange).toHaveBeenCalledWith('TKT 20-23');
  });
});


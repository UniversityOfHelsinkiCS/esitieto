import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import InfoBox from './InfoBox';
import { MemoryRouter, useNavigate } from 'react-router-dom';

// Mocking useNavigate
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('InfoBox', () => {
  it('does not render when isOpen is false', () => {
    const onCloseMock = vi.fn();
    const { queryByText } = render(<InfoBox isOpen={false} onClose={onCloseMock} baseURL="/" />, { wrapper: MemoryRouter });
    expect(queryByText('Kurssin esitietojen visualisointityökalu')).toBeNull();
  });

  it('renders when isOpen is true', () => {
    const onCloseMock = vi.fn();
    const { getByText } = render(<InfoBox isOpen={true} onClose={onCloseMock} baseURL="/" />, { wrapper: MemoryRouter });
    expect(getByText('Kurssin esitietojen visualisointityökalu')).not.toBeNull();
  });

  it('calls onClose when Sulje button is clicked', () => {
    const onCloseMock = vi.fn();
    const { getByText } = render(<InfoBox isOpen={true} onClose={onCloseMock} baseURL="/" />, { wrapper: MemoryRouter });
    fireEvent.click(getByText('Sulje'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('prompts for password and navigates on correct password', () => {
    const onCloseMock = vi.fn();
    const navigateMock = vi.fn();
    vi.spyOn(window, 'prompt').mockImplementation(() => 'guaqamole on parempi');
    useNavigate.mockImplementation(() => navigateMock);
    
    const { getByText } = render(<InfoBox isOpen={true} onClose={onCloseMock} baseURL="/" />, { wrapper: MemoryRouter });
    fireEvent.click(getByText('Dev portaali'));
    
    expect(window.prompt).toHaveBeenCalledWith('Anna salasana:');
    expect(navigateMock).toHaveBeenCalledWith('/secret');
  });

  it('prompts for password and alerts on wrong password', () => {
    const onCloseMock = vi.fn();
    window.alert = vi.fn();
    vi.spyOn(window, 'prompt').mockImplementation(() => 'wrong password');
    
    const { getByText } = render(<InfoBox isOpen={true} onClose={onCloseMock} baseURL="/" />, { wrapper: MemoryRouter });
    fireEvent.click(getByText('Dev portaali'));
    
    expect(window.prompt).toHaveBeenCalledWith('Anna salasana:');
    expect(window.alert).toHaveBeenCalledWith('Väärä salasana');
  });
});
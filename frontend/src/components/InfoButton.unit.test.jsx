import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InfoButton from './InfoButton'; 

describe('InfoButton', () => {
  test('renders the button with correct text', () => {
    const { getByText } = render(<InfoButton />);
    expect(getByText('i')).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<InfoButton onClick={handleClick} />);
    fireEvent.click(getByText('i'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

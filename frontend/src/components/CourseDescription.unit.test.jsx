import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CourseDescription from './CourseDescription';

describe('CourseDescription', () => {
  test('renders when isOpen is true', () => {
    const { getByText } = render(<CourseDescription isOpen={true} content="Test Content" onClose={() => {}} />);
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  test('does not render when isOpen is false', () => {
    const { queryByText } = render(<CourseDescription isOpen={false} content="Test Content" onClose={() => {}} />);
    expect(queryByText('Test Content')).toBeNull();
  });

  test('calls onClose when the backdrop is clicked', () => {
    const mockOnClose = jest.fn();
    const { container } = render(<CourseDescription isOpen={true} content="Test Content" onClose={mockOnClose} />);
    fireEvent.click(container.querySelector('.infoscreen-backdrop'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('does not call onClose when the content is clicked', () => {
    const mockOnClose = jest.fn();
    const { container } = render(<CourseDescription isOpen={true} content="Test Content" onClose={mockOnClose} />);
    fireEvent.click(container.querySelector('.infoscreen-content'));
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});

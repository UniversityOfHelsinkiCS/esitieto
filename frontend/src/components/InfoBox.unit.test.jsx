import React from 'react';
import { render } from '@testing-library/react';
import { InfoBox } from './InfoBox';

describe('InfoBox', () => {
    test('renders when isOpen is true', () => {
        const onCloseMock = jest.fn();
        const { getByText } = render(<InfoBox isOpen={true} onClose={onCloseMock} />);
        expect(getByText('Course prerequisite visualization tool')).toBeInTheDocument();
    });

    test('does not render when isOpen is false', () => {
        const onCloseMock = jest.fn();
        const { queryByText } = render(<InfoBox isOpen={false} onClose={onCloseMock} />);
        expect(queryByText('Course prerequisite visualization tool')).toBeNull();
    });
});
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { InfoBox } from './InfoBox';

describe('InfoBox', () => {
    test('does not render when isOpen is false', () => {
        const onCloseMock = jest.fn();
        const { queryByText } = render(<InfoBox isOpen={false} onClose={onCloseMock} />);
        expect(queryByText('Kurssin esitietojen visualisointityökalu')).toBeNull();
    });
});
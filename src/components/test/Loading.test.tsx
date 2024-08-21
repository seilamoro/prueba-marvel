import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '../common/Loading';

describe('Loading Component', () => {
    test('renders without fail', () => {
        render(<Loading />);
        const loadingContainer = screen.getByTestId('loading-container');
        const spinner = screen.getByTestId('spinner');
        expect(loadingContainer).toBeInTheDocument();
        expect(spinner).toBeInTheDocument();
    });
});


import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppContext, AppContextType } from "../../application/provider";
import Error from '../common/Error';
import { mockContextValue } from './mock';

jest.mock('../common/Header', () => () => <div>Mocked Header</div>);

describe('Error Component', () => {
    test('renders component', () => {
        const errorMessage = "An unexpected error occurred";
        render(
            <AppContext.Provider value={mockContextValue as AppContextType}>
                <Error>
                    <p>{errorMessage}</p>
                </Error>
            </AppContext.Provider>
        );

        const errorDiv =screen.getByTestId('divError');
        expect(errorDiv).toBeInTheDocument();
        expect(errorDiv).toHaveClass('divError');
        const errorText = screen.getByText(errorMessage);
        expect(errorText).toBeInTheDocument();
        
    });
});

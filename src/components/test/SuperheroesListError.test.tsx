import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SuperheroesListView from '../superheroes/SuperheroesListView';
import { AppContext, AppContextType } from "../../application/provider";
import { mockContextValue } from './mock';


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useRouteMatch: () => ({ url: '/' }),
}));

jest.mock('../../hooks/useSuperheroes', () => ({
    useSuperheroes: () => {
        return {
            data:  { list: [] },
            error: 'An unexpected error occurred',
            isLoading: false,
        };
    }
}));

describe('SuperheroesListView Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders error state', async () => {
        render(
            <AppContext.Provider value={mockContextValue as AppContextType}>
                <BrowserRouter>
                    <SuperheroesListView />
                </BrowserRouter>
            </AppContext.Provider>
        );

        const errorDiv =screen.getByTestId('divError');
        expect(errorDiv).toBeInTheDocument();
        expect(errorDiv).toHaveClass('divError');
        const errorText = screen.getByText('An unexpected error occurred');
        expect(errorText).toBeInTheDocument();
    });
});

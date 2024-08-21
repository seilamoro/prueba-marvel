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
            error: '',
            isLoading: true,
        };
    }
}));

describe('SuperheroesListView Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders loading state', async () => {
        render(
            <AppContext.Provider value={mockContextValue as AppContextType}>
                <BrowserRouter>
                    <SuperheroesListView />
                </BrowserRouter>
            </AppContext.Provider>
        );

        const loadingContainer = screen.getByTestId('loading-container');
        const spinner = screen.getByTestId('spinner');
        expect(loadingContainer).toBeInTheDocument();
        expect(spinner).toBeInTheDocument();
    });
});

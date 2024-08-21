import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SuperheroDetail from '../superheroes/SuperheroDetail';
import { AppContext, AppContextType } from "../../application/provider";
import { mockContextValue } from './mock';


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ id: '1' }),
    useRouteMatch: () => ({ url: '/detail/id/' }),
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

describe('SuperheroDetail Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders loading state', async () => {
        render(
            <AppContext.Provider value={mockContextValue as AppContextType}>
                <BrowserRouter>
                    <SuperheroDetail />
                </BrowserRouter>
            </AppContext.Provider>
        );

        const loadingContainer = screen.getByTestId('loading-container');
        const spinner = screen.getByTestId('spinner');
        expect(loadingContainer).toBeInTheDocument();
        expect(spinner).toBeInTheDocument();
    });
});

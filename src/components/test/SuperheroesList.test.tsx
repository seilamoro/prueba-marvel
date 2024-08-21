import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SuperheroesListView from '../superheroes/SuperheroesListView';
import { AppContext, AppContextType } from "../../application/provider";
import { mockContextValue, mockSuperheroes } from './mock';


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useRouteMatch: () => ({ url: '/' }),
}));

jest.mock('../../hooks/useSuperheroes', () => ({
    useSuperheroes: () => {
        return {
            data: mockSuperheroes,
            error: '',
            isLoading: false,
        };
    }
}));

describe('SuperheroesListView Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders component', async () => {
        render(
            <AppContext.Provider value={mockContextValue as AppContextType}>
                <BrowserRouter>
                    <SuperheroesListView />
                </BrowserRouter>
            </AppContext.Provider>
        );

        expect(screen.getByText('3-D Man')).toBeInTheDocument();
        expect(screen.getByText('A-Bom (HAS)')).toBeInTheDocument();
    });
});

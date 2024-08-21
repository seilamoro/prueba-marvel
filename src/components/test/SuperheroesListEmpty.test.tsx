import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SuperheroesListView from '../superheroes/SuperheroesListView';
import { AppContext } from "../../application/provider";
import { mockContextValueEmpty, mockSuperheroesEmpty } from './mock';


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useRouteMatch: () => ({ url: '/' }),
}));

jest.mock('../../hooks/useSuperheroes', () => ({
    useSuperheroes: () => {
        return {
            data: mockSuperheroesEmpty,
            error: '',
            isLoading: false,
        };
    }
}));

describe('SuperheroesListView Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders component with empty list', async () => {
        render(
            <AppContext.Provider value={mockContextValueEmpty}>
                <BrowserRouter>
                    <SuperheroesListView />
                </BrowserRouter>
            </AppContext.Provider>
        );

        expect(screen.getByText('No superheroes found.')).toBeInTheDocument();

    });
});

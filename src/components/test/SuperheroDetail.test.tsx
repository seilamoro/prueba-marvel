import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SuperheroDetail from '../superheroes/SuperheroDetail';
import { AppContext, AppContextType } from "../../application/provider";
import { mockContextValue, mockSuperhero } from './mock';


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ id: '1' }),
    useRouteMatch: () => ({ url: '/detail/id/' }),
}));

jest.mock('../../hooks/useSuperheroes', () => ({
    useSuperheroes: () => {
        return {
            data: mockSuperhero,
            error: '',
            isLoading: false,
        };
    }
}));

describe('SuperheroDetail Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders component', async () => {
        render(
            <AppContext.Provider value={mockContextValue as AppContextType}>
                <BrowserRouter>
                    <SuperheroDetail />
                </BrowserRouter>
            </AppContext.Provider>
        );

        expect(screen.getByText('3-D Man')).toBeInTheDocument();
        expect(screen.getByText('test')).toBeInTheDocument();
        expect(screen.getByText('COMICS')).toBeInTheDocument();
        expect(screen.getByText('Amazing Fantasy #15')).toBeInTheDocument();
    });
});

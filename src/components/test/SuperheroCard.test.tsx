import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SuperheroCard from '../superheroes/SuperheroCard';
import { AppContext, AppContextType } from "../../application/provider";
import { PropsSuperhero } from '../../interfaces/superheroes';
import { mockContextValue, mockContextValueNull, mockSuperheroes } from './mock';

const mockSuperheroProps: PropsSuperhero = {
    data: mockSuperheroes.list[0]
};

jest.mock('../common/Favorite', () => () => <div>Mocked Favorite</div>);

describe('SuperheroCard Component', () => {
    test('renders without error', () => {
        render(
            <Router>
                <AppContext.Provider value={mockContextValue as AppContextType}>
                    <SuperheroCard {...mockSuperheroProps} />
                </AppContext.Provider>
            </Router>
        );

        const cardElement = screen.getByText('3-D Man');
        expect(cardElement).toBeInTheDocument();
    });

    test('renders superhero image with correct src and alt text', () => {
        render(
            <Router>
                <AppContext.Provider value={mockContextValue as AppContextType}>
                    <SuperheroCard {...mockSuperheroProps} />
                </AppContext.Provider>
            </Router>
        );

        const imageElement = screen.getByAltText('imagen superheroe');
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute('src', 'image1.jpg');
    });

    test('renders superhero name', () => {
        render(
            <Router>
                <AppContext.Provider value={mockContextValue as AppContextType}>
                    <SuperheroCard {...mockSuperheroProps} />
                </AppContext.Provider>
            </Router>
        );

        const nameElement = screen.getByText('3-D Man');
        expect(nameElement).toBeInTheDocument();
        expect(nameElement).toHaveClass('superheroCardName');
    });

    test('renders the Favorite component', () => {
        render(
            <Router>
                <AppContext.Provider value={mockContextValue as AppContextType}>
                    <SuperheroCard {...mockSuperheroProps} />
                </AppContext.Provider>
            </Router>
        );

        const favoriteElement = screen.getByText('Mocked Favorite');
        expect(favoriteElement).toBeInTheDocument();
    });

    it('render component with context null', () => {
        render(
            <AppContext.Provider value={mockContextValueNull}>
                <SuperheroCard {...mockSuperheroProps} />
            </AppContext.Provider>
        );

        const searchInput = screen.getByTestId('dataError');
        expect(searchInput).toBeInTheDocument();
    });
});

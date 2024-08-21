import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Favorite from '../common/Favorite';
import { AppContext, AppContextType } from "../../application/provider";
import { PropsSuperhero } from '../../interfaces/superheroes';
import { mockContextValue, mockContextValueNull, mockSuperheroes } from './mock';

const mockSuperheroProps: PropsSuperhero = {
    data: mockSuperheroes.list[2]
};

describe('Favorite Component', () => {
    test('renders add to favorites button when superhero is not in favorites', () => {
        render(
            <AppContext.Provider value={mockContextValue as AppContextType}>
                <Favorite {...mockSuperheroProps} />
            </AppContext.Provider>
        );

        const addButton = screen.getByAltText('Add to favorites');
        expect(addButton).toBeInTheDocument();
    });

    test('renders remove from favorites button when superhero is in favorites', () => {
        const contextValueWithFavorite = {
            ...mockContextValue,
            data: {
                ...mockContextValue.data,
                listFavorites: [1, 2, 3],
            },
        };

        render(
            <AppContext.Provider value={contextValueWithFavorite as AppContextType}>
                <Favorite {...mockSuperheroProps} />
            </AppContext.Provider>
        );

        const removeButton = screen.getByAltText('Remove from favorites');
        expect(removeButton).toBeInTheDocument();
    });

    test('handles adding superhero to favorites', () => {
        render(
            <AppContext.Provider value={mockContextValue as AppContextType}>
                <Favorite {...mockSuperheroProps} />
            </AppContext.Provider>
        );

        const addButton = screen.getByAltText('Add to favorites');
        fireEvent.click(addButton);

        expect(mockContextValue.setData).toHaveBeenCalledTimes(1);
        expect(mockContextValue.setData).toHaveBeenCalledWith({
            listMain: mockContextValue.data.listMain,
            listToShow: mockContextValue.data.listToShow,
            listFavorites: [1, 2, 3],
            showFavorites: mockContextValue.data.showFavorites
        });
    });

    test('handles removing superhero from favorites', () => {
        const contextValueWithFavorite = {
            ...mockContextValue,
            data: {
                ...mockContextValue.data,
                listFavorites: [1, 2, 3],
            },
        };

        render(
            <AppContext.Provider value={contextValueWithFavorite as AppContextType}>
                <Favorite {...mockSuperheroProps} />
            </AppContext.Provider>
        );

        const removeButton = screen.getByAltText('Remove from favorites');
        fireEvent.click(removeButton);

        expect(contextValueWithFavorite.setData).toHaveBeenCalledTimes(1);
        expect(contextValueWithFavorite.setData).toHaveBeenCalledWith({
            listMain: contextValueWithFavorite.data.listMain,
            listToShow: contextValueWithFavorite.data.listToShow,
            listFavorites: [1, 2],
            showFavorites: contextValueWithFavorite.data.showFavorites
        });
    });

    it('render component with context null', () => {
        render(
            <AppContext.Provider value={mockContextValueNull}>
                <Favorite {...mockSuperheroProps} />
            </AppContext.Provider>
        );

        const searchInput = screen.getByTestId('dataError');
        expect(searchInput).toBeInTheDocument();
    });
});

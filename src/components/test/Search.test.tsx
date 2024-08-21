import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppContext } from '../../application/provider';
import Search from '../common/Search';
import { mockContextValue, mockContextValueNull, mockSuperheroes } from './mock';


describe('Search component', () => {
    it('render component', () => {
        render(
            <AppContext.Provider value={mockContextValue}>
                <Search />
            </AppContext.Provider>
        );

        const searchInput = screen.getByPlaceholderText(/SEARCH A CHARACTER.../i);
        expect(searchInput).toBeInTheDocument();
    });

    it('render component with context null', () => {
        render(
            <AppContext.Provider value={mockContextValueNull}>
                <Search />
            </AppContext.Provider>
        );

        const searchInput = screen.getByTestId('dataError');
        expect(searchInput).toBeInTheDocument();
    });

    it('filters superheroes based on search input', () => {
        render(
            <AppContext.Provider value={mockContextValue}>
                <Search />
            </AppContext.Provider>
        );

        const searchInput = screen.getByPlaceholderText(/SEARCH A CHARACTER.../i);
        fireEvent.change(searchInput, { target: { value: '3-D Man' } });

        expect(mockContextValue.setData).toHaveBeenCalledWith({
            listMain: mockSuperheroes,
            listToShow: { list: [
                {
                    id: 1, name: '3-D Man',
                    description: 'test',
                    image: 'image1.jpg',
                    resourceURI: '',
                    comicsList: []
                }
            ] },
            listFavorites: [1,2],
            showFavorites: false
        });
    });

    it('shows all superheroes when search input is empty', () => {
        render(
            <AppContext.Provider value={mockContextValue}>
                <Search />
            </AppContext.Provider>
        );

        const searchInput = screen.getByPlaceholderText(/SEARCH A CHARACTER.../i);
        fireEvent.change(searchInput, { target: { value: '' } });

        expect(mockContextValue.setData).toHaveBeenCalledWith({
            listMain: mockSuperheroes,
            listToShow: mockSuperheroes,
            listFavorites: [1,2],
            showFavorites: false
        });
    });
});

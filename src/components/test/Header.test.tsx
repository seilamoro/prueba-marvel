import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../common/Header';
import { AppContext, AppContextType } from "../../application/provider";
import { mockContextValue } from './mock';

describe('Header Component', () => {

    it('renders the logo and favorites icon', () => {
        render(
            <Router>
                <AppContext.Provider value={mockContextValue as AppContextType}>
                    <Header />
                </AppContext.Provider>
            </Router>
        );

        const logo = screen.getByAltText('Go to home page');
        const favoritesIcon = screen.getByAltText('Show favorites');
        expect(logo).toBeInTheDocument();
        expect(favoritesIcon).toBeInTheDocument();
    });

    test('displays the correct number of favorites', () => {
        render(
            <Router>
                <AppContext.Provider value={mockContextValue as AppContextType}>
                    <Header />
                </AppContext.Provider>
            </Router>
        );

        const favoritesCount = screen.getByText(mockContextValue.data.listFavorites.length);
        expect(favoritesCount).toBeInTheDocument();
    });

    test('calls setData with updated context when favorites icon is clicked', () => {
        render(
            <Router>
                <AppContext.Provider value={mockContextValue as AppContextType}>
                    <Header />
                </AppContext.Provider>
            </Router>
        );

        const favoritesIcon = screen.getByAltText('Show favorites');
        fireEvent.click(favoritesIcon);

        expect(mockContextValue.setData).toHaveBeenCalledTimes(1);
        expect(mockContextValue.setData).toHaveBeenCalledWith({
            listMain: mockContextValue.data.listMain,
            listToShow: mockContextValue.data.listToShow,
            listFavorites: mockContextValue.data.listFavorites,
            showFavorites: true
        });
    });

    it('navigates to the main page when the logo is clicked', () => {
        render(
            <Router>
                <AppContext.Provider value={mockContextValue as AppContextType}>
                    <Header />
                </AppContext.Provider>
            </Router>
        );

        const logo = screen.getByAltText('Go to home page');
        fireEvent.click(logo);

        expect(mockContextValue.setData).toHaveBeenCalledTimes(1);
        expect(mockContextValue.setData).toHaveBeenCalledWith({
            listMain: mockContextValue.data.listMain,
            listToShow: mockContextValue.data.listToShow,
            listFavorites: mockContextValue.data.listFavorites,
            showFavorites: false
        });
    });
});

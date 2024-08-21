import React from 'react';
import { render, screen } from '@testing-library/react';
import { PropsComic } from '../../interfaces/superheroes';
import ComicCard from '../comics/ComicCard';
import { mockComicData } from './mock';

const mockProps: PropsComic = {
    data: mockComicData
};

describe('ComicCard Component', () => {
    test('renders comic image with correct src and alt text', () => {
        render(<ComicCard {...mockProps} />);
        
        const imageElement = screen.getByAltText('imagen superheroe');
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute('src', mockComicData.image);
    });

    test('renders comic title', () => {
        render(<ComicCard {...mockProps} />);
        
        const titleElement = screen.getByText(mockComicData.title);
        expect(titleElement).toBeInTheDocument();
        expect(titleElement).toHaveClass('comicTitle');
    });

    test('renders comic year', () => {
        render(<ComicCard {...mockProps} />);
        
        const yearElement = screen.getByText('1962');
        expect(yearElement).toBeInTheDocument();
        expect(yearElement).toHaveClass('comicYear');
    });
});

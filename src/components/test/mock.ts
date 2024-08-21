import { SuperheroesList } from "../../interfaces/superheroes";

const mockSuperheroes: SuperheroesList = {
    list: [
        {
            id: 1,
            name: '3-D Man',
            description: 'test',
            image: 'image1.jpg',
            resourceURI: '',
            comicsList: []
        },
        {
            id: 2,
            name: 'A-Bom (HAS)',
            description: 'test',
            image: 'image2.jpg',
            resourceURI: '',
            comicsList: []
        },
        {
            id: 3,
            name: 'A.I.M.',
            description: 'test',
            image: 'image3.jpg',
            resourceURI: '',
            comicsList: []
        },
    ],
};

const mockSuperheroesEmpty: SuperheroesList = { list: [] };

const mockComicData = {
    id: 1,
    title: 'Amazing Fantasy #15',
    date: '08-01-1962',
    image: '/path/to/image.jpg'
};

const mockSuperhero: SuperheroesList = {
    list: [
        {
            id: 1, 
            name: '3-D Man',
            description: 'test',
            image: 'image1.jpg',
            resourceURI: '',
            comicsList: [ mockComicData ]
        }
    ],
};

const mockSuperheroNotComics: SuperheroesList = {
    list: [
        {
            id: 1, 
            name: '3-D Man',
            description: 'test',
            image: 'image1.jpg',
            resourceURI: '',
            comicsList: [ ]
        }
    ],
};

const mockContextValueNull = {
    data: {
        listMain: null,
        listToShow: null,
        listFavorites: null,
        showFavorites: false
    },
    setData: jest.fn()
};

const mockContextValueEmpty = {
    data: {
        listMain: { list: [] },
        listToShow: { list: [] },
        listFavorites: [],
        showFavorites: false
    },
    setData: jest.fn()
};

const mockContextValue = {
    data: {
        listMain: mockSuperheroes,
        listToShow: mockSuperheroes,
        listFavorites: [ 1, 2 ],
        showFavorites: false
    },
    setData: jest.fn()
};

const mockContextValueFavoritesShow = {
    data: {
        listMain: mockSuperheroes,
        listToShow: mockSuperheroes,
        listFavorites: [ 1, 2 ],
        showFavorites: true
    },
    setData: jest.fn()
};

export { 
    mockSuperheroes, 
    mockSuperheroesEmpty,
    mockSuperhero, 
    mockComicData, 
    mockSuperheroNotComics, 
    mockContextValue, 
    mockContextValueNull, 
    mockContextValueEmpty,
    mockContextValueFavoritesShow 
};
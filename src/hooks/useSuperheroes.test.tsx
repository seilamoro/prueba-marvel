import { renderHook, waitFor } from "@testing-library/react";
import axios from 'axios';
import axiosMock from 'axios-mock-adapter';
import { useSuperheroes } from './useSuperheroes'

const mockAxios = new axiosMock(axios);

const mockData = [{ id: 1, name: 'Superhero 1', description: '', resourceURI: '', comics: {collectionURI: 'test'}, thumbnail: {path: "", extension: ""}}];
const mockDataComic = [{ id: 1, title: 'Comic 1', dates: [{date: '01-01-2024'}], thumbnail: {path: "", extension: ""}}];

const mockDataRecibe = [{ id: 1, name: 'Superhero 1', description: '',  image: '.', resourceURI: '', comicsList: []}];
const mockDataRecibeComic = [{ id: 1, name: 'Superhero 1', description: '',  image: '.', resourceURI: '', comicsList: [
    {id: 1, title: 'Comic 1', date: '01-01-2024', image: '.'}
]}];

describe('useSuperheroes hook', () => {
    beforeEach(() => {
        mockAxios.reset();
    });

    it('should return the initial list', async () => {
        mockAxios.onGet(/v1\/public\/characters/).reply(200, {
            data: {
                results: mockData,
            },
        });

        const { result } = renderHook(() => useSuperheroes('characters'));
        await waitFor(() => expect(result.current.data.list.toString()).toBe(mockDataRecibe.toString()));
    });

    it('should return the superhero details', async () => {
        mockAxios.onGet(/v1\/public\/characters/).reply(200, {
            data: {
                results: mockData,
            },
        });

        mockAxios.onGet(/v1\/public\/test/).reply(200, {
            data: {
                results: mockDataComic,
            },
        });

        const { result } = renderHook(() => useSuperheroes('characters/1', true));
        await waitFor(() => expect(result.current.data.list.toString()).toBe(mockDataRecibeComic.toString()));
    });
});

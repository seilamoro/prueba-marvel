import { useEffect, useState } from 'react';
import axios from 'axios';
import md5 from "md5";
import { Comic, Superhero, SuperheroesList } from '../interfaces/superheroes';

const publicKey: string = '90a7b77cc2106af91554c2187db95471';
const privateKey: string = '58558db57f1fbc27494c78e1d0852f7881c9163f';
const apiBaseURL: string = "https://gateway.marvel.com/v1/public/";
const ts: string = "1";

const generateHash = () => md5(ts + privateKey + publicKey);

const fetchComics = async (url: string, hash: string): Promise<Comic[]> => {
    try {
        const { data } = await axios.get(`${url}?limit=20&orderBy=onsaleDate&ts=${ts}&apikey=${publicKey}&hash=${hash}`);
        return data.data.results.map((comic: any) => ({
            id: comic.id,
            title: comic.title,
            date: comic.dates[0].date,
            image: comic.thumbnail.path + "." + comic.thumbnail.extension,
        }));
    } catch {
        return [];
    }
};

const fetchSuperheroes = async (url: string, hash: string, comicList: boolean): Promise<SuperheroesList> => {
    const endpoint = `${apiBaseURL}${url}?limit=50&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    const { data } = await axios.get(endpoint);
    const results = data.data.results;

    const superheroesList: SuperheroesList = { list: [] };

    const superheroPromises = results.map(async (elem: any) => {
        const comicsList = comicList ? await fetchComics(elem.comics.collectionURI, hash) : [];
        return {
            id: elem.id,
            name: elem.name,
            description: elem.description,
            image: elem.thumbnail.path + "." + elem.thumbnail.extension,
            resourceURI: elem.resourceURI,
            comicsList,
        } as Superhero;
    });

    superheroesList.list = await Promise.all(superheroPromises);
    return superheroesList;
};

export const useSuperheroes = (url: string, comicList: boolean = false) => {
    const [data, setData] = useState<SuperheroesList>({ list: [] });
    const [error, setError] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const hash = generateHash();
            setLoading(true);
            setError("");

            try {
                const superheroesList = await fetchSuperheroes(url, hash, comicList);
                setData(superheroesList);
            } catch (err) {
                setError(`Error fetching superheroes: ${(err as Error).message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, comicList]);

    return { data, error, isLoading };
};
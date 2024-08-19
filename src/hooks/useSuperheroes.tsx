import { useEffect, useState } from 'react';
import axios from 'axios';
import md5 from "md5";
import { Superhero, SuperheroesList } from '../interfaces/superheroes';

const publicKey: string = '90a7b77cc2106af91554c2187db95471';
const privateKey: string = '58558db57f1fbc27494c78e1d0852f7881c9163f';
const apiBaseURL: string = "https://gateway.marvel.com/v1/public/";
const ts: string = "1";

const generateHash = () => md5(ts + privateKey + publicKey);

const fetchSuperheroes = async (url: string, hash: string): Promise<SuperheroesList> => {
    const endpoint = `${apiBaseURL}${url}?limit=50&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    const { data } = await axios.get(endpoint);
    const results = data.data.results;

    const superheroesList: SuperheroesList = { list: [] };

    const superheroPromises = results.map(async (elem: any) => {
        return {
            id: elem.id,
            name: elem.name,
            description: elem.description,
            image: elem.thumbnail.path + "." + elem.thumbnail.extension,
            resourceURI: elem.resourceURI
        } as Superhero;
    });

    superheroesList.list = await Promise.all(superheroPromises);
    return superheroesList;
};

export const useSuperheroes = (url: string) => {
    const [data, setData] = useState<SuperheroesList>({ list: [] });
    const [error, setError] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const hash = generateHash();
            setLoading(true);
            setError("");

            try {
                const superheroesList = await fetchSuperheroes(url, hash);
                setData(superheroesList);
            } catch (err) {
                setError(`Error fetching superheroes: ${(err as Error).message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, error, isLoading };
};
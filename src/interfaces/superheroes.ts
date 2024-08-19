interface Superhero {
    id: number,
    name: string,
    description: string,
    image: string,
    resourceURI: string,
    comicsList: Comic[],
}

interface Comic {
    id: number,
    title: string,
    date: string,
    image: string,
}

interface PropsSuperhero {
    data: Superhero;
}

interface PropsComic {
    data: Comic;
}

interface SuperheroesList {
    list: Superhero[]
}

export type { Superhero, Comic, SuperheroesList, PropsSuperhero, PropsComic }
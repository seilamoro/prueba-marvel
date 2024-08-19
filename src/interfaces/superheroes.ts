interface Superhero {
    id: number,
    name: string,
    description: string,
    image: string,
    resourceURI: string
}

interface PropsSuperhero {
    data: Superhero;
}

interface SuperheroesList {
    list: Superhero[]
}

export type { Superhero, SuperheroesList, PropsSuperhero }
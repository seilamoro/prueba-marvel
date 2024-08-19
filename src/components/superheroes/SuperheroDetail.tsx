import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSuperheroes } from "../../hooks/useSuperheroes";
import { Comic, Superhero } from "../../interfaces/superheroes";
import Header from "../common/Header";
import './SuperheroDetail.css';
import ComicCard from "../comics/ComicCard";
import Loading from "../common/Loading";
import Error from "../common/Error";

const SuperheroDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading } = useSuperheroes(`characters/${id}`, true);
    const [superhero, setSuperhero] = useState<Superhero | null>(null);

    useEffect(() => {
        if (data.list.length > 0) {
            setSuperhero(data.list[0]);
        }
    }, [data]);

    if (isLoading) return <Loading />;

    if (error !== "") {
        return <Error><p>{error}</p></Error>;
    }
    
    return (
        <div>
            <Header />
            {superhero ? (
                <SuperheroInfo superhero={superhero} />
            ) : (
                <p>No superhero data available</p>
            )}
        </div>
    );
};

const SuperheroInfo: React.FC<{ superhero: Superhero }> = ({ superhero }) => {
    return (
        <div>
            <div className="superheroData">
                <div className="superheroElements">
                    <img src={superhero.image} alt={superhero.name} className="superheroImg" />
                    <div>
                        <div className="superheroComicDivTitle">
                            <div className="superheroName">{superhero.name}</div>
                            <div className='superheroFavorite'><img src={window.location.origin + '/unselected.png'} alt="favorites" /></div>
                        </div>
                        <div className="superheroDesc">{superhero.description}</div>
                    </div>
                </div>
            </div>
            <div className="superheroComicTitle">COMICS</div>
            <ComicsList comics={superhero.comicsList} />
        </div>
    );
};

const ComicsList: React.FC<{ comics: Comic[] }> = ({ comics }) => {
    return (
        <div className="superheroComicsList">
            {comics.length > 0 ? (
                comics.map((comic) => (
                    <ComicCard key={comic.id} data={comic} />
                ))
            ) : (
                <p>No comics available</p>
            )}
        </div>
    );
};

export default SuperheroDetail;
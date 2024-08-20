import { useContext, useState, useEffect } from "react";
import { AppContext, AppContextType, ContextData } from "../../application/provider";
import { PropsSuperhero, Superhero } from "../../interfaces/superheroes";
import './Favorite.css';

const Favorite = (props: PropsSuperhero) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const superheroData: Superhero = props.data;
    const { data, setData } = useContext(AppContext) as AppContextType;

    useEffect(() => {
        if(data.listFavorites) {
            setIsFavorite(data.listFavorites.indexOf(superheroData.id) === -1? false : true);
        }
    }, [data, superheroData.id]);

    if (!data.listFavorites) return (<div data-testid="dataError">Error</div>);

    const handleClick = () => {
        let listFavorites: number[] = data.listFavorites;
        if(isFavorite) {
            listFavorites = listFavorites.filter(elem => elem !== superheroData.id);
        }
        else {
            listFavorites.push(superheroData.id);
        }
        setIsFavorite(!isFavorite);

        let contextData: ContextData = {
            listFavorites: listFavorites,
            listMain: data.listMain,
            listToShow: data.listToShow,
            showFavorites: data.showFavorites
        }

        setData(contextData);
    }

    if(!isFavorite) {
        return (
            <div>
                <img src={window.location.origin + '/unselected.png'} alt="Add to favorites" className='favorites' onClick={handleClick} />
            </div>
        );
    }
    return (
        <div>
            <img src={window.location.origin + '/default.png'} alt="Remove from favorites" className='favorites' onClick={handleClick} />
        </div>
    );
}

export default Favorite;
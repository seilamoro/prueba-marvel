import { Link } from 'react-router-dom';
import './SuperheroCard.css';
import { PropsSuperhero, Superhero } from '../../interfaces/superheroes';
import { AppContext, AppContextType } from "../../application/provider";
import { useContext } from 'react';
import Favorite from '../common/Favorite';

const SuperheroCard = (props: PropsSuperhero) => {
    const superheroData: Superhero = props.data;
    const data = useContext(AppContext) as AppContextType;

    if (!data.data.listMain) return (<div data-testid="dataError">Error</div>);

    return (
        <div className='superheroCard'>
            <div className='superheroCardImage'>
                <Link key={superheroData.id} to={`/detail/${superheroData.id}`} className='link-notUnderLine'>
                    <img src={superheroData.image} alt="imagen superheroe"></img>
                </Link>
            </div>
            <div className='superheroCardData'>
                <Link key={superheroData.id} to={`/detail/${superheroData.id}`} className='link-notUnderLine'>
                    <div className='superheroCardName'>{superheroData.name}</div>
                </Link>
                <div className='superheroCardFavorite'><Favorite data={superheroData}/></div>
            </div>
        </div>
    )
}

export default SuperheroCard;
import { PropsComic, Comic } from '../../interfaces/superheroes';
import './ComicCard.css';

const ComicCard = (props: PropsComic) => {
    const comicData: Comic = props.data;
    const year: number = new Date(Date.parse(comicData.date)).getFullYear();

    return (
        <div className='comicMain'>
            <div><img src={comicData.image} alt="imagen superheroe" width="180"></img></div>
            <div className='comicTitle'>{comicData.title}</div>
            <div className='comicYear'>{year.toString()}</div>
        </div>
    )
}

export default ComicCard;
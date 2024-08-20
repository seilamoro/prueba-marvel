import { useContext, useState, useEffect } from "react";
import { AppContext, AppContextType, ContextData } from "../../application/provider";
import { Superhero, SuperheroesList } from "../../interfaces/superheroes";
import './Search.css';

const Search = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const { data, setData } = useContext(AppContext) as AppContextType;
    
    useEffect(() => {
        let superheroesFilter: SuperheroesList = {
            list: []
        };
        if(data.listMain) {
            superheroesFilter = {
                list: data.listMain.list.filter((elem: Superhero) => elem.name.toLowerCase().search(searchValue.toLocaleLowerCase()) !== -1)
            }
        }
        let updatedContextData: ContextData = {
            listToShow: superheroesFilter,
            listMain: data.listMain,
        }
        setData(updatedContextData);
    }, [searchValue, data.listMain, setData]);

    if (!data.listMain) return (<div data-testid="dataError">Error</div>);

    return (
        <div className="search-container">
            <img src={window.location.origin + '/find.svg'} alt="" className="search-icon" />
            <input
                type="search"
                id="search"
                value={searchValue}
                aria-label="Search"
                onChange={e => setSearchValue(e.target.value)}
                placeholder="SEARCH A CHARACTER..."
            />
        </div>
    );
}

export default Search;
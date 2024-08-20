import React, { useContext, useEffect } from "react";
import { AppContext, AppContextType, ContextData } from "../../application/provider";
import { useSuperheroes } from "../../hooks/useSuperheroes";
import SuperheroCard from "./SuperheroCard";
import Header from "../common/Header";
import './SuperheroesListView.css';
import Search from "../common/Search";
import Loading from "../common/Loading";
import Error from "../common/Error";
import { Superhero, SuperheroesList } from "../../interfaces/superheroes";

const SuperheroesListView: React.FC = () => {
    const { data, setData } = useContext(AppContext) as AppContextType;
    const { data: apiData, error, isLoading } = useSuperheroes("characters");

    useEffect(() => {
        if (apiData.list.length > 0) {
            if(data.showFavorites) {
                let superheroesFavoritesList: Superhero[] = apiData.list.filter(
                    function (elem: Superhero) {
                        return data.listFavorites.indexOf(elem.id) >= 0;
                    },
                );
                let superheroesList: SuperheroesList = {
                    list: superheroesFavoritesList
                }
                let contextData: ContextData = {
                    listMain: superheroesList,
                    listToShow: superheroesList,
                    listFavorites: data.listFavorites,
                    showFavorites: data.showFavorites
                }
                setData(contextData);
            }
            else {
                let contextData: ContextData = {
                    listMain: apiData,
                    listToShow: apiData,
                    listFavorites: data.listFavorites,
                    showFavorites: data.showFavorites
                }
                setData(contextData);
            }
        }
    }, [apiData, data.showFavorites, data.listFavorites, setData]);

    if (isLoading) {
        return <Loading />;
    }

    if (error !== "") {
        return <Error><p>{error}</p></Error>;
    }

    return (
        <div>
            <Header />
            <div className="divSearch">
                {data.showFavorites ? (
                   <div className="searchFavoritesTitle">FAVORITES</div>
                ) : null }
                <Search />
                <div className="searchResult">{ data.listToShow.list.length } RESULTS</div>
            </div>
            <div className="divList">
                {data.listToShow.list.length > 0 ? (
                    data.listToShow.list.map((entry) => (
                        <SuperheroCard key={entry.id} data={entry} />
                    ))
                ) : (
                    <div className="divListEmpty">No superheroes found.</div>
                )}
            </div>
        </div>
    );
};

export default SuperheroesListView;
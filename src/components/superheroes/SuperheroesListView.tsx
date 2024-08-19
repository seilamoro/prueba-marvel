import React, { useContext, useEffect } from "react";
import { AppContext, AppContextType, ContextData } from "../../application/provider";
import { useSuperheroes } from "../../hooks/useSuperheroes";
import SuperheroCard from "./SuperheroCard";
import './SuperheroesListView.css';

const SuperheroesListView: React.FC = () => {
    const { data, setData } = useContext(AppContext) as AppContextType;
    const { data: apiData, error, isLoading } = useSuperheroes("characters");

    useEffect(() => {
        if (apiData.list.length > 0) {
            let contextData: ContextData = {
                listMain: apiData,
                listToShow: apiData,
            }
            setData(contextData);
        }
    }, [apiData, setData]);

    if (isLoading) {
        return (<div>cargando</div>);
    }

    if (error !== "") {
        return (<div>Error: {error}</div>);
    }

    return (
        <div>
            <div className="divSearch">
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
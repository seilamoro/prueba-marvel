import React, { useContext, useEffect } from "react";
import { AppContext, AppContextType, ContextData } from "../../application/provider";
import { useSuperheroes } from "../../hooks/useSuperheroes";
import SuperheroCard from "./SuperheroCard";
import './SuperheroesListView.css';
import Search from "../common/Search";
import Loading from "../common/Loading";
import Error from "../common/Error";

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

    if (isLoading) return <Loading />;

    if (error !== "") {
        return <Error><p>{error}</p></Error>;
    }

    return (
        <div>
            <div className="divSearch">
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
import React, { createContext, ReactNode, useState } from "react";
import { SuperheroesList } from "../interfaces/superheroes";

export interface ContextData {
    listMain: SuperheroesList,
    listToShow: SuperheroesList,
}

let superheroesList: SuperheroesList = {
    list: []
};

let contextData: ContextData = {
    listMain: superheroesList,
    listToShow: superheroesList,
}

export type AppContextType = {
    data: ContextData, 
    setData: (value: ContextData) => void;
}

export const AppContext = createContext({});

interface Props {
    children: ReactNode
}

export function DataContextProvider ({children}: Props) {
    const [data, setData] = useState<ContextData>(contextData);
    return <AppContext.Provider value={{data, setData}}>{children}</AppContext.Provider>
}
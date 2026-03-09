import React, { createContext, useContext } from 'react'

export const Data = createContext();

export const DataProvider = ({ children }) => {
    const count = 0;
    const value = {
        count
    }
    return (
        <Data.Provider value={value}>
            {children}
        </Data.Provider>
    )
};

export const useData = () => {
    const context = useContext(Data);
    return context;
}

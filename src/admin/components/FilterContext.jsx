import React, { createContext, useState } from 'react';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [filterOptions, setFilterOptions] = useState({});

    return (
        <FilterContext.Provider value={{ filterOptions, setFilterOptions }}>
            {children}
        </FilterContext.Provider>
    );
};

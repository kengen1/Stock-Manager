import React, { createContext, useContext, useState, useEffect } from 'react';

const HoldingsContext = createContext();

export function useHoldings() {
  return useContext(HoldingsContext);
}

    export const saveHoldingsToSessionStorage = (holdings) => {
        sessionStorage.setItem('holdings', JSON.stringify(holdings));
    };

    // Function to load holdings data from sessionStorage
    export const loadHoldingsFromSessionStorage = () => {
        const storedHoldings = sessionStorage.getItem('holdings');
        return storedHoldings ? JSON.parse(storedHoldings) : [];
    };

export function HoldingsProvider({ children }) {
  const [holdings, setHoldings] = useState([]); // Initialize holdings with an empty array

  // Function to add a holding
  function addHolding(newHolding) {
    setHoldings((prevHoldings) => [...prevHoldings, newHolding]);
  }

  // Function to remove a holding by index
  function removeHolding(index) {
    setHoldings((prevHoldings) => {
      const updatedHoldings = [...prevHoldings];
      updatedHoldings.splice(index, 1);
      return updatedHoldings;
    });
  }

  const getHoldings = () => {
    return holdings;
  };

    useEffect(() => {
        // Save holdings to sessionStorage whenever it changes
        saveHoldingsToSessionStorage(holdings);
    }, [holdings]);

  return (
    <HoldingsContext.Provider value={{ addHolding, removeHolding, getHoldings, setHoldings }}>
      {children}
    </HoldingsContext.Provider>
  );
}

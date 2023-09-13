import React, { useContext, useState } from "react";
import StockContext from "../context/StockContext";

const SearchResults = ({ results }) => {
  const { setStockSymbol } = useContext(StockContext);
  const [isVisible, setIsVisible] = useState(true); // Add state variable for visibility

  const handleResultClick = (item) => {
    setStockSymbol(item.symbol);
    setIsVisible(false); // Hide the SearchResults component after a result is clicked
  };

  return isVisible ? (
    <ul className="absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll bg-white border-neutral-200 custom-scrollbar">
      {results.map((item) => {
        return (
          <li
            key={item.symbol}
            className="cursor-pointer p-4 m-2 flex items-center justify-between rounded-md hover:bg-indigo-200"
            onClick={() => {
              handleResultClick(item);
            }}
          >
            <span>{item.symbol}</span>
            <span>{item.description}</span>
          </li>
        );
      })}
    </ul>
  ) : null; // Render nothing when isVisible is false
};

export default SearchResults;

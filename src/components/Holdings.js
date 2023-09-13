import React from "react";
import { useEffect } from "react";
import Card from "./Card";
import { useHoldings, saveHoldingsToSessionStorage, loadHoldingsFromSessionStorage } from "../context/HoldingsContext";

const Holdings = () => {
    const { getHoldings, setHoldings } = useHoldings(); // Get the holdings data and setHoldings function from the context

  const tableHeaders = ["Symbol", "Price", "Quantity", "Value"];

  // Function to format currency values
  const formatCurrency = (value) => {
    return `$${value.toFixed(2)}`;
  };


  useEffect(() => {
    // Load holdings data from session storage when the component mounts
    const storedHoldings = loadHoldingsFromSessionStorage();
    if (storedHoldings.length > 0) {
      setHoldings(storedHoldings);
    }
  }, [setHoldings]);

  useEffect(() => {
    // Save holdings data to session storage whenever it changes
    saveHoldingsToSessionStorage(getHoldings());
  }, [getHoldings]);
  return (
    <Card>
      <span className="font-bold text-xl mb-4 text-white">Holdings</span>
      <div className="overflow-x-auto p-8">
        <table className="min-w-full">
          <thead>
            <tr>
              {tableHeaders.map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 bg-slate-900 text-left text-xs leading-4 font-large text-slate-400 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {getHoldings().map((row, index) => (
              <tr
                key={index}
                className={"bg-slate-800"}
              >
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-slate-400">
                  {row.symbol}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-slate-400">
                  {formatCurrency(row.price)}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-slate-400">
                  {row.quantity}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-slate-400">
                  {formatCurrency(row.value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default Holdings;

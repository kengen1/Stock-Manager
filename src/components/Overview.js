import React from "react";
import Card from "./Card";
import Search from "./Search";

const Overview = ({ symbol, name, price, change, changePercent, currency, marketCapitalization }) => {
    const details = {
      symbol,
      name,
      price,
      change,
      changePercent,
      currency,
      marketCapitalization,
    };

    const detailsList = {
      symbol: "Symbol",
      name: "Name",
      price: "Price",
      changePercent: "% Change",
      currency: "Currency",
      marketCapitalization: "Market Capitalization",
    };

    // Function to convert market capitalization from millions to billions
    const convertMillionToBillion = (valueInMillion) => {
      return `${(valueInMillion / 1000).toFixed(2)}B`;
    };

    const textStyle = {
      fontWeight: 'bold',
      fontSize: '130%',
      color: 'white',
    };

    return (
      <Card>
        <span style={textStyle}>Stock Details</span>
        <Search />
        <div className="relative text-slate-400">
          <ul className="w-full h-80 flex flex-col justify-between divide-y-1 mt-1">
            {Object.keys(detailsList).map((item) => {
              return (
                <li key={item} className="flex-1 flex justify-between items-center text-lg xl:text-xl 2xl:text-2xl">
                  <span>{detailsList[item]}</span>
                  {item === "changePercent" ? (
                    <span
                      className={`text-lg xl:text-xl 2xl:text-2xl ${
                        change > 0 ? "text-lime-500" : "text-red-500"
                      }`}
                    >
                      {change} <span>({changePercent}%)</span>
                    </span>
                  ) : item === "marketCapitalization" ? (
                    <span>{convertMillionToBillion(details[item])}</span>
                  ) : (
                    <span className="font-bold">{details[item]}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </Card>
    );
  };

  export default Overview;
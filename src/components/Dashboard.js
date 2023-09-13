import React, { useContext, useState, useEffect } from 'react';
import Overview from "./Overview";
import Holdings from "./Holdings";
import Equity from "./Equity";
import CashBalance from "./CashBalance";
import ManageFunds from "./ManageFunds";
import StockContext from '../context/StockContext';
import { fetchQuote, fetchStockDetails } from '../api/stock-api';
import ShareTransaction from './ShareTransaction';
import { HoldingsProvider } from '../context/HoldingsContext';

const Dashboard = () => {
  // Define stock symbol context
  const { stockSymbol } = useContext(StockContext);

  const [stockDetails, setStockDetails] = useState({});
  const [quote, setQuote] = useState({});


  useEffect(() => {
    const updateStockDetails = async () => {
      try {
        const result = await fetchStockDetails(stockSymbol);
        setStockDetails(result);
      } catch (error) {
        setStockDetails({});
        console.log(error);
      }
    };

    const updateStockOverview = async () => {
      try {
        const result = await fetchQuote(stockSymbol);
        setQuote(result);
      } catch (error) {
        setQuote({});
        console.log(error);
      }
    };

    updateStockDetails();
    updateStockOverview();
  }, [stockSymbol]);

    // Function to save data to sessionStorage
    const saveToSessionStorage = (key, value) => {
        sessionStorage.setItem(key, JSON.stringify(value));
    };

    // Function to load data from sessionStorage
    const loadFromSessionStorage = (key, defaultValue) => {
        const storedValue = sessionStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    };

    // Define state variables for equity and cash balance
    const [equity, setEquity] = useState(() => loadFromSessionStorage('equity', 0));
    const [cashBalance, setCashBalance] = useState(() => loadFromSessionStorage('cashBalance', 1000));

  // Define functions to manage funds
  const handleDeposit = (amount) => {
    const newCashBalance = cashBalance + amount;
    setCashBalance(newCashBalance);
  };

  const handleWithdrawal = (amount) => {
    const newCashBalance = cashBalance - amount;
    if (newCashBalance >= 0) {
      setCashBalance(newCashBalance);
    } else {
      // Handle insufficient funds here
      console.error('Insufficient funds.');
    }
  };

  const handleEquityDeposit = (amount) => {
    const newEquityBalance = equity + amount;
    setEquity(newEquityBalance);
  };

  const handleEquityWithdrawal = (amount) => {
    const newEquityBalance = equity - amount;
    if (newEquityBalance >= 0) {
      setEquity(newEquityBalance);
    } else {
      // Handle insufficient funds here
      console.error('Insufficient funds.');
    }
  };

  useEffect(() => {
    // Save cashBalance and equity to sessionStorage whenever they change
    saveToSessionStorage('equity', equity);
    saveToSessionStorage('cashBalance', cashBalance);
  }, [cashBalance, equity]);

  return (
    <HoldingsProvider> {/* Wrap the Dashboard with the HoldingsProvider */}
<div className="bg-slate-900 min-h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand">
  <div className="row-span-1 xl:row-span-1">
    <Equity equity={equity} />
  </div>

  <div className="row-span-1 xl:row-span-1">
    <CashBalance cashBalance={cashBalance} />
  </div>

  <div className="row-span-1 xl:row-span-1">
    <ManageFunds
      cashBalance={cashBalance}
      onDeposit={handleDeposit}
      onWithdrawal={handleWithdrawal}
    />
  </div>

  <div className="md:col-span-2 row-span-5">
    <Holdings />
  </div>

  <div className="row-span-2 xl:row-span-2">
    <ShareTransaction
      tickerSymbol={stockSymbol}
      price={quote.pc}
      cashBalance={cashBalance}
      onDeposit={handleDeposit}
      onWithdraw={handleWithdrawal}
      onDepositEquity={handleEquityDeposit}
      onWithdrawEquity={handleEquityWithdrawal}
      equity={equity}
    />
  </div>

  <div className="row-span-2 xl:row-span-3 ">
    <Overview
      symbol={stockSymbol}
      name={stockDetails.name}
      price={quote.pc}
      change={quote.d}
      changePercent={quote.dp}
      currency={stockDetails.currency}
      marketCapitalization={stockDetails.marketCapitalization}
    >
    </Overview>
  </div>
</div>

    </HoldingsProvider>
  );
};

export default Dashboard;

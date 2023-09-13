import React, { useState } from 'react';
import Card from './Card';
import { PlusCircleIcon, MinusCircleIcon, CheckCircleIcon } from '@heroicons/react/solid';
import { useHoldings } from '../context/HoldingsContext';

const ShareTransaction = ({ tickerSymbol, price, cashBalance, onDeposit, onWithdraw, onDepositEquity, onWithdrawEquity, equity }) => {
  const [shareAmount, setShareAmount] = useState('');
  const [totalTransaction, setTotalTransaction] = useState(0); // Add totalTransaction state
  const [errorMessage, setErrorMessage] = useState('');
  const { addHolding, removeHolding, getHoldings, setHoldings } = useHoldings();

  const handleReview = () => {
    setTotalTransaction(0);
    const amount = parseFloat(shareAmount);
    if (amount > 0) {
      const newTotalTransaction = amount * price;
      setTotalTransaction(newTotalTransaction); // Update the totalTransaction state
    }
  };

  //check for error conditions, add funds to equity and add data to table
  const handleBuy = () => {
    if (totalTransaction > 0 && cashBalance >= totalTransaction) {
      const existingHoldingIndex = getHoldings().findIndex((holding) => holding.symbol === tickerSymbol);
      const newQuantity = parseFloat(shareAmount);

      if (existingHoldingIndex !== -1) {
        // Get a copy of the existing holdings array
        const updatedHoldings = [...getHoldings()];

        // Update the existing holding's quantity and value
        const existingHolding = updatedHoldings[existingHoldingIndex];
        existingHolding.quantity += newQuantity;
        existingHolding.value += totalTransaction;

        // Update the holdings array in the context
        setHoldings(updatedHoldings);
      } else {
        // Add a new holding
        const newHolding = {
          symbol: tickerSymbol,
          price: price,
          quantity: newQuantity,
          value: totalTransaction,
        };
        addHolding(newHolding);
      }

      // Deduct the total transaction amount from cash balance
      onWithdraw(totalTransaction);

      // Update equity with the total transaction amount
      onDepositEquity(totalTransaction);

      // Reset totalTransaction and shareAmount
      setTotalTransaction(0);
      setShareAmount(0);

      setErrorMessage('');
    } else {
      setErrorMessage('Insufficient funds');
    }

      // Reset totalTransaction and shareAmount
      setTotalTransaction(0);
      setShareAmount(0);
  };


  //check for error conditions, add funds to cash balance and remove data from table
  const handleSell = () => {
    const holdings = getHoldings();
    const existingHoldingIndex = holdings.findIndex((holding) => holding.symbol === tickerSymbol);

    if (existingHoldingIndex === -1) {
      // Display an error message if the holding doesn't exist
      setErrorMessage('You don\'t own this stock');
      return;
    }

    const existingHolding = holdings[existingHoldingIndex];
    const newQuantity = parseFloat(shareAmount);

    if (totalTransaction > 0 && equity >= 0) {
      if (newQuantity <= existingHolding.quantity) {
        if (existingHolding.quantity === newQuantity) {
          // If the quantity is equal, remove the holding
          removeHolding(existingHoldingIndex);
        } else {
          // Adjust the quantity and value
          const updatedHolding = {
            ...existingHolding,
            quantity: existingHolding.quantity - newQuantity,
            value: existingHolding.value - totalTransaction,
          };
          removeHolding(existingHoldingIndex);
          addHolding(updatedHolding);
        }
        // Deduct the total transaction amount from equity
        onWithdrawEquity(totalTransaction);
        // Deposit the total transaction amount to cash balance
        onDeposit(totalTransaction);

        // Reset totalTransaction and shareAmount
        setTotalTransaction(0);
        setShareAmount(0);

        setErrorMessage('');
      } else {
        // Display an error message if the user is trying to sell more than they own
        setErrorMessage('You cannot sell more shares than you own');
      }
    } else {
      setErrorMessage('Insufficient equity');
    }
  };


  return (
    <Card>
    <span className="font-bold text-xl text-white">Buy & Sell</span>

    <div className="my-4 text-slate-400">
        <p>Symbol: {tickerSymbol}</p>
        <p>Price per Share: ${price}</p>
    </div>

    <div className="flex items-center border-2 rounded-md relative z-50 w-110 bg-white border-neutral-200">
        <input
        type="number"
        className="w-full px-4 py-1 focus:outline-none rounded-md"
        placeholder="Enter (#) of shares..."
        value={shareAmount}
        onChange={(event) => setShareAmount(event.target.value)}
        />
    </div>

    <div className="flex">
        <button
        className="h-8 w-full bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2 text-white"
        onClick={handleReview}
        >
        <span className="pr-2">Calculate</span>
        <CheckCircleIcon className="h-4 w-4 fill-gray-100" />
        </button>
    </div>

    <div className="my-4 text-slate-400">
        <p>(#) Shares : {shareAmount}</p>
        <p>Cumulative Price: {typeof totalTransaction === 'number' ? `$${totalTransaction.toFixed(2)}` : 'N/A'}</p>
    </div>

    <div className="flex">
        <button
        className="h-8 w-1/2  bg-green-600 rounded-md flex justify-center items-center m-1 p-2 py-0 text-white"
        onClick={handleBuy}
        >
        <span className="pr-2">Buy</span>
        <PlusCircleIcon className="h-4 w-4 fill-gray-100" />
        </button>

        <button
        className="h-8 w-1/2 bg-red-600 rounded-md flex justify-center items-center m-1 p-2 text-white"
        onClick={handleSell}
        >
        <span className="pr-2">Sell</span>
        <MinusCircleIcon className="h-4 w-4 fill-gray-100" />
        </button>
    </div>
    {errorMessage && (
        <p className="text-red-500 mt-2">{errorMessage}</p>
    )}
    </Card>



  );
};

export default ShareTransaction;

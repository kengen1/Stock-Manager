import React, { useState } from 'react';
import Card from './Card';
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/solid';

const ManageFunds = ({ cashBalance, onDeposit, onWithdrawal }) => {
  const [transactionAmount, setTransactionAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDeposit = () => {
    const amount = parseFloat(transactionAmount);
    if (amount > 0) {
      onDeposit(amount);
      setTransactionAmount('');
      // Clear the error message on successful deposit
      setErrorMessage('');
    }
  };

  const handleWithdrawal = () => {
    const amount = parseFloat(transactionAmount);
    if (amount > 0 && cashBalance >= amount) {
      onWithdrawal(amount);
      setTransactionAmount('');
      // Clear the error message on successful withdrawal
      setErrorMessage('');
    } else {
      setErrorMessage('Insufficient funds');
    }
  };

  const textStyle = {
    fontWeight: 'bold',
    fontSize: '130%',
    color: 'white',
  };

  return (
    <Card>
      <span style={textStyle}>Manage Funds</span>
      <div className="flex items-center my-4 border-2 rounded-md relative z-50 w-110 bg-white border-neutral-200">
        <input
          type="number"
          className="w-full px-4 py-1 focus:outline-none rounded-md"
          placeholder="Enter amount..."
          value={transactionAmount}
          onChange={(event) => setTransactionAmount(event.target.value)}
        />
      </div>

      <div className="flex">
        <button className="h-8 w-1/2 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2 py-0 text-white" onClick={handleDeposit}>
            <span className="pr-2">Deposit</span>
          <PlusCircleIcon className="h-4 w-4 fill-gray-100" />
        </button>

        <button className="h-8 w-1/2 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2 py-0 text-white" onClick={handleWithdrawal}>
            <span className="pr-2">Withdraw</span>
          <MinusCircleIcon className="h-4 w-4 fill-gray-100" />
        </button>
      </div>

      {errorMessage && (
        <p className="text-red-500 mt-2">{errorMessage}</p>
      )}
    </Card>
  );
};

export default ManageFunds;

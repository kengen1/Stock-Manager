import React from 'react';
import Card from './Card';

const CashBalance = ({ cashBalance }) => {
  const textStyle = {
    fontWeight: 'bold',
    fontSize: '130%',
    color: 'white',
  };

  const balanceStyle = {
    fontSize: '300%',
    marginTop: '8px',
  };

  // Use toFixed(2) to format cashBalance with a maximum of 2 decimal points
  const formattedCashBalance = parseFloat(cashBalance).toFixed(2);

  return (
    <Card>
      <div>
        <span style={textStyle}>Cash Balance:</span>
      </div>
      <div>
        {/* Display the formatted cashBalance value */}
        <span className="text-slate-400" style={balanceStyle}>${formattedCashBalance}</span>
      </div>
    </Card>
  );
};

export default CashBalance;

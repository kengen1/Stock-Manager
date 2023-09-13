import React from 'react';
import Card from './Card';

const Equity = ({ equity }) => {
  const textStyle = {
    fontWeight: 'bold',
    fontSize: '130%',
    color: 'white',
  };

  const equityStyle = {
    fontSize: '300%',
    marginTop: '8px',
  };

  // Use toFixed(2) to format equity with a maximum of 2 decimal points
  const formattedEquity = parseFloat(equity).toFixed(2);

  return (
    <Card>
      <div>
        <span style={textStyle}>Equity:</span>
      </div>
      <div>
        {/* Display the formatted equity value */}
        <span className="text-slate-400" style={equityStyle}>${formattedEquity}</span>
      </div>
    </Card>
  );
};

export default Equity;

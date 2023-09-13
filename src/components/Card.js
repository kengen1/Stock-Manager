import React from "react";

const Card = ({ children }) => {
  return (
    <div className="w-full h-full rounded-md relative p-8 border-2 border-slate-800 bg-slate-800">
      {children}
    </div>
  );
};

export default Card;
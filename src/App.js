import { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import StockContext from "./context/StockContext";
import { HoldingsProvider } from "./context/HoldingsContext";

function App() {
  const [stockSymbol, setStockSymbol] = useState("GOOG");
  
  return (
    <HoldingsProvider>
      <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
        <Dashboard/>
      </StockContext.Provider>
    </HoldingsProvider>
  );
}

export default App;
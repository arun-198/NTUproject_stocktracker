import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Portfolio from './pages/Portfolio';
import AddStock from './pages/AddStock';
import AboutUs from './pages/News';
import ContactUs from './pages/ContactUs';
import LogIn from './pages/LogIn';
import StockCalculator from './pages/StockCalculator';
import UserProfile from './pages/UserProfile';
import Dividend from './pages/Dividend';
import stockPortfolioImage from './images/stock_logo.png';

// Finnhub API Key
const API_KEY = import.meta.env.VITE_API_KEY;

const dummyData = [
  { Name: "Apple", Symbol: "AAPL", Price: 230, Quantity: 10 },
  { Name: "Google", Symbol: "GOOG", Price: 182, Quantity: 15 },
  { Name: "Boeing", Symbol: "BA", Price: 182, Quantity: 20 },
  { Name: "Microsoft", Symbol: "MSFT", Price: 453, Quantity: 25 },
  { Name: "Intel", Symbol: "INTC", Price: 34, Quantity: 30 },
];

function App() {
  const [stocks, setStocks] = useState(dummyData);
  const [sortConfig, setSortConfig] = useState({
    key: "Name",
    direction: "ascending",
  });

  // Fetch data for a single stock
  const fetchStockData = useCallback(async (symbol) => {
    try {
      console.log(`Fetching data for symbol: ${symbol}`);
      const response = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
      );
      if (response.data.c) {
        const latestPrice = response.data.c;
        return {
          close: latestPrice,
          symbol,
        };
      } else {
        console.error(`No data found for symbol: ${symbol}`);
        return { close: null, symbol };
      }
    } catch (error) {
      console.error(`Error fetching data for symbol: ${symbol}`, error);
      return { close: null, symbol }; // Return fallback
    }
  }, []);

  // Fetch data for all stocks
  const fetchData = useCallback(async () => {
    console.log("Fetching data for all stocks");
    const updatedStocks = await Promise.all(
      stocks.map(async (stock) => {
        const result = await fetchStockData(stock.Symbol);
        return {
          ...stock,
          Price: result.close !== null ? result.close : stock.Price,
        };
      })
    );

    // Only update stocks if the data changes
    if (JSON.stringify(updatedStocks) !== JSON.stringify(stocks)) {
      console.log("Stocks updated");
      setStocks(updatedStocks);
    } else {
      console.log("No changes in stock data");
    }
  }, [stocks, fetchStockData]);

  // Fetch data on mount and every 5 minutes
  useEffect(() => {
    fetchData(); // Initial fetch
    const interval = setInterval(() => {
      fetchData();
    }, 300000); // Every 5 minutes
    return () => clearInterval(interval); // Cleanup interval
  }, [fetchData]);

  // Add a new stock
  const handleAddStock = (stock) => {
    setStocks([...stocks, stock]);
  };

  // Delete a stock
  const handleDeleteStock = (index) => {
    const newStocks = stocks.filter((_, i) => i !== index);
    setStocks(newStocks);
  };

  // Refresh stock data
  const handleRefresh = () => {
    fetchData();
  };

  // Sort stocks
  const sortedStocks = [...stocks].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <Router>
      <div className="MainApp">
        <Header />
        <nav className="navBar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/pnl">P&L</Link></li>
            <li><Link to="/dividend">Dividend</Link></li>
            <li><Link to="/news">News</Link></li>
            <li><Link to="/contactus">Contact Us</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <div className="homeBar">
                <div>Welcome to the <br />Stock Portfolio App!</div>
                <img
                  src={stockPortfolioImage}
                  alt="Stock Portfolio"
                  style={{
                    marginTop: "20px",
                    maxWidth: "10%",
                    height: "auto",
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
              </div>
            }
          />
          <Route
            path="/portfolio"
            element={
              <>
                <AddStock handleAdd={handleAddStock} />
                <button className="refresh-button" onClick={handleRefresh}>
                  Refresh Prices
                </button>
                <Portfolio
                  stocks={sortedStocks}
                  handleDelete={handleDeleteStock}
                  requestSort={requestSort}
                  sortConfig={sortConfig}
                />
              </>
            }
          />
          <Route path="/news" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/pnl" element={<StockCalculator />} />
          <Route path="/dividend" element={<Dividend />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import axios from 'axios';
import '../styles/StockCalculator.css';


 // Replace with your actual API key

 const StockCalculator = () => {
  const [stockName, setStockName] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [numShares, setNumShares] = useState('');
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState('');
  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchStockData = async () => {
    if (parseFloat(purchasePrice) <= 0 || parseFloat(numShares) <= 0) {
      setError('Please enter positive values for shares and purchase price.');
      return;
    }

    setError('');
    try {
      const quoteResponse = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${stockName}&token=${API_KEY}`
      );
      const metricResponse = await axios.get(
        `https://finnhub.io/api/v1/stock/metric?symbol=${stockName}&metric=all&token=${API_KEY}`
      );

      const latestPrice = quoteResponse.data.c;
      const gainLoss = (latestPrice - parseFloat(purchasePrice)) * parseFloat(numShares);
      const gainLossPercentage = ((latestPrice - parseFloat(purchasePrice)) / parseFloat(purchasePrice)) * 100;

      const newStockData = {
        stockName,
        purchasePrice: parseFloat(purchasePrice),
        numShares: parseFloat(numShares),
        latestPrice,
        gainLoss,
        gainLossPercentage,
        peRatio: metricResponse.data.metric.peBasicExclExtraTTM,
        week52High: metricResponse.data.metric['52WeekHigh'],
        week52Low: metricResponse.data.metric['52WeekLow']
      };

      setStocks([...stocks, newStockData]);
    } catch (error) {
      setError('Failed to fetch stock data. Please check the stock symbol and try again.');
    }
  };

  const calculateTotalGainLoss = () => {
    return stocks.reduce((total, stock) => total + stock.gainLoss, 0);
  };

  return (

    
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px", // Full viewport height
          backgroundColor: "white", // Optional background for better visibility
        }}
      >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchStockData();
        }}
        style={{
          marginTop: "80px",
          display: "flex",
          flexDirection: "column", // Stack elements vertically
          alignItems: "center", // Align inputs and labels to the center
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          backgroundColor: "white",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "300px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "10px" ,marginTop:"0px" ,fontSize: "1.5rem"}}>
          Profit/Loss Calculation
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
           alignItems: "center",
            marginBottom: "10px",
            width: "100%", 
          }}
        >
          <label
            style={{
              fontWeight: "bold",
              width: "120px",
              textAlign: "center",
              marginRight: "10px",
            }}
          >
            Stock:
          </label>
          <input
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderStyle: "solid",
              borderRadius: 5,
              width: "100px",
              padding: "5px",
            }}
            type="text"
            value={stockName}
            onChange={(e) => setStockName(e.target.value)}
            required
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
            width: "100%", 
          }}
        >
          <label
            style={{
              fontWeight: "bold",
              width: "120px",
              textAlign: "center",
              marginRight: "10px",
            }}
          >
            Buy Price:
          </label>
          <input
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderStyle: "solid",
              borderRadius: 5,
              width: "100px",
              padding: "5px",
            }}
            type="number"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
            required
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
            width: "100%", 
          }}
        >
          <label
            style={{
              fontWeight: "bold",
              width: "120px",
              textAlign: "center",
              marginRight: "10px",
            }}
          >
            Qty:
          </label>
          <input
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderStyle: "solid",
              borderRadius: 5,
              width: "100px",
              padding: "5px",
            }}
            type="number"
            value={numShares}
            onChange={(e) => setNumShares(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            width: "50%",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#0da7a7",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Fetch Data
        </button>
      </form>
    </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {stocks.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Stock Name</th>
              <th>Purchase Price</th>
              <th>Number of Shares</th>
              <th>Latest Price</th>
              <th>Gain/Loss</th>
              <th>Gain/Loss Percentage</th>
              <th>PE Ratio</th>
              <th>52-Week High</th>
              <th>52-Week Low</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <tr key={index}>
                <td>{stock.stockName}</td>
                <td>{stock.purchasePrice}</td>
                <td>{stock.numShares}</td>
                <td>{stock.latestPrice}</td>
                <td style={{ color: stock.gainLoss >= 0 ? 'green' : 'red' }}>
                  {stock.gainLoss.toFixed(2)}
                </td>
                <td style={{ color: stock.gainLossPercentage >= 0 ? 'green' : 'red' }}>
                  {stock.gainLossPercentage.toFixed(2)}%
                </td>
                <td>{stock.peRatio}</td>
                <td>{stock.week52High}</td>
                <td>{stock.week52Low}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="4">Total Gain/Loss</td>
              <td colSpan="5" style={{ color: calculateTotalGainLoss() >= 0 ? 'green' : 'red' }}>
                {calculateTotalGainLoss().toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};


export default StockCalculator;




/*import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const StockCalculator = () => {
  const [stockSymbol, setStockSymbol] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [numShares, setNumShares] = useState('');
  const [stocks, setStocks] = useState([]);

  const fetchLatestPrice = async (symbol) => {
    const token = 'cqbul4hr01qmbcu8st5gcqbul4hr01qmbcu8st60';
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${token}`;
    //'https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=all&token=${token}'
    const response = await axios.get(url);
    return response.data.c;
  };

  const addStock = async () => {
    const latestPrice = await fetchLatestPrice(stockSymbol);
    const gainOrLoss = ((latestPrice - purchasePrice) * numShares).toFixed(2);
    const gainOrLossColor = gainOrLoss >= 0 ? 'green' : 'red';

    const newStock = {
      stockSymbol,
      purchasePrice: parseFloat(purchasePrice).toFixed(2),
      numShares: parseFloat(numShares).toFixed(2),
      latestPrice: latestPrice.toFixed(2),
      gainOrLoss: parseFloat(gainOrLoss).toFixed(2),
      gainOrLossColor,
    };

    setStocks([...stocks, newStock]);
    setStockSymbol('');
    setPurchasePrice('');
    setNumShares('');
  };

  const totalGainOrLoss = stocks.reduce((acc, stock) => acc + parseFloat(stock.gainOrLoss), 0).toFixed(2);
  const totalGainOrLossColor = totalGainOrLoss >= 0 ? 'green' : 'red';

  return (
    <div className="app">
      <h1>Stock Gain or Loss Tracker</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Stock Name or Code"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value)}
        />
        <input
          type="number"
          placeholder="Purchase Price"
          value={purchasePrice}
          onChange={(e) => setPurchasePrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Number of Shares"
          value={numShares}
          onChange={(e) => setNumShares(e.target.value)}
        />
        <button onClick={addStock}>Add Stock</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Stock Name/Code</th>
            <th>Purchase Price</th>
            <th>Number of Shares</th>
            <th>Latest Price</th>
            <th>Gain/Loss </th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr key={index}>
              <td>{stock.stockSymbol}</td>
              <td>{stock.purchasePrice}</td>
              <td>{stock.numShares}</td>
              <td>{stock.latestPrice}</td>
              <td style={{ color: stock.gainOrLossColor }}>{stock.gainOrLoss}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="4">Total Gain/Loss</td>
            <td style={{ color: totalGainOrLossColor }}>{totalGainOrLoss}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StockCalculator;*/

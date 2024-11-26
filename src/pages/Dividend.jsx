import React, { useState } from 'react';
import axios from 'axios';
import '../styles/StockCalculator.css';

const dummyData = [
  {
    symbol: "AAPL",
    historical: [
      {
        date: "2024-08-12",
        label: "August 12, 24",
        adjDividend: 0.25,
        dividend: 0.25,
        recordDate: "2024-08-12",
        paymentDate: "2024-08-15",
        declarationDate: "2024-08-01"
      },
      {
        date: "2024-05-10",
        label: "May 10, 24",
        adjDividend: 0.25,
        dividend: 0.25,
        recordDate: "2024-05-13",
        paymentDate: "2024-05-16",
        declarationDate: "2024-05-02"
      },
      {
        date: "2024-02-09",
        label: "February 09, 24",
        adjDividend: 0.24,
        dividend: 0.24,
        recordDate: "2024-02-12",
        paymentDate: "2024-02-15",
        declarationDate: "2024-02-01"
      },
      {
        date: "2023-11-10",
        label: "November 10, 23",
        adjDividend: 0.24,
        dividend: 0.24,
        recordDate: "2023-11-13",
        paymentDate: "2023-11-16",
        declarationDate: "2023-11-02"
      },
      {
        date: "2023-08-10",
        label: "August 10, 23",
        adjDividend: 0.23,
        dividend: 0.23,
        recordDate: "2023-08-13",
        paymentDate: "2023-08-16",
        declarationDate: "2023-08-02"
      }
    ]
  }
];

const Dividend = () => {
  const [stockCode, setStockCode] = useState('');
  const [corporateActions, setCorporateActions] = useState(dummyData[0].historical.slice(0, 5)); // Default to first 5 actions from dummy data
  const [message, setMessage] = useState('');
  const apiKey = import.meta.env.VITE_API_KEY_2;

  const handleInputChange = (e) => {
    setStockCode(e.target.value);
  };

  const fetchCorporateActions = async () => {
    try {
      const response = await axios.get(
        `https://financialmodelingprep.com/api/v3/historical-price-full/stock_dividend/${stockCode}?apikey=${apiKey}`
      );
      const data = response.data;

      if (data && data.historical && data.historical.length > 0) {
        // Get the first 5 objects from the `historical` array
        const recentActions = data.historical.slice(0, 5);
        setCorporateActions(recentActions);
        setMessage('');
      } else {
        setCorporateActions([]);
        setMessage('No historical dividend data available for this stock.');
      }
    } catch (error) {
      console.error('Error fetching corporate actions:', error);
      setMessage('An error occurred while fetching data.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCorporateActions();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          style={{
            borderWidth: 1,
            borderColor: "gray",
            borderStyle: "solid",
            borderRadius: 5,
            width: "100px",
            height: "43px",
            padding: "5px",
          }}
          type="text"
          value={stockCode}
          onChange={handleInputChange}
          placeholder="stock"
          required
        />
        <button style={{
                  width: "100px",
                  marginLeft: "10px",
                  padding: "10px 5px",
                  border: "none",
                  borderRadius: "5px",
                  backgroundColor: "#0da7a7",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                }} type="submit">Get Data</button>
      </form>

      {message && <p>{message}</p>}

      {corporateActions.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Ex-Date</th>
              <th>Payment Amount</th>
              <th>Payment/Receipt Date</th>
            </tr>
          </thead>
          <tbody>
            {corporateActions.map((action, index) => (
              <tr key={index}>
                <td>{action.date}</td>
                <td>{action.dividend}</td>
                <td>{action.paymentDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dividend;

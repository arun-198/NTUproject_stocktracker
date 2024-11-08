import React, { useState } from 'react';
import axios from 'axios';
import '../styles/StockCalculator.css';

const dummyData = [
    {
      "Ex-Date": "16-06-2024",
      "Payment Amount": "6",
      "Payment/Receipt Date": "30-06-2024",
      
    }
  ];

const Dividend = () => {
  const [stockCode, setStockCode] = useState('');
  const [corporateActions, setCorporateActions] = useState(dummyData);
  const [message, setMessage] = useState('');
  const apiKey = '5UKVS9O0PVBSM92I';

  const handleInputChange = (e) => {
    setStockCode(e.target.value);
  };

  const fetchCorporateActions = async () => {
    try {
      const response = await axios.get(`https://www.alphavantage.co/query?function=DIVIDENDS&symbol=${stockCode}&apikey=${apiKey}`);
      const data = response.data;

      if (data && data['data']) {
        const actions = data['data'];
        const recentActions = actions.filter(action => {
          const exDate = new Date(action['exDate']);
          const sixMonthsAgo = new Date();
          sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
          return exDate >= sixMonthsAgo;
        });

        if (recentActions.length > 0) {
          setCorporateActions(recentActions);
          setMessage('');
        } else {
          setCorporateActions([]);
          setMessage('This stock has no corporate action in recent 6 months.');
        }
      } else {
        setCorporateActions([]);
        setMessage('This stock has no corporate action in recent 6 months.');
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
          type="text"
          value={stockCode}
          onChange={handleInputChange}
          placeholder="Enter stock name or code"
          required
        />
        <button type="submit">Get Corporate Actions</button>
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
                <td>{action.exDate}</td>
                <td>{action.amount}</td>
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

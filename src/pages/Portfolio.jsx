import React from 'react';
import '../styles/Portfolio.css';

const Portfolio = ({ stocks, handleDelete, requestSort, sortConfig }) => {
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <div className="portfolio">
      <h2>Your Portfolio</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort('Name')} className={getClassNamesFor('Name')}>Name</th>
            <th onClick={() => requestSort('Price')} className={getClassNamesFor('Price')}>Price</th>
            <th onClick={() => requestSort('Quantity')} className={getClassNamesFor('Quantity')}>Quantity</th>
            <th onClick={() => requestSort('Worth')} className={getClassNamesFor('Worth')}>Worth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr key={index}>
              <td>{stock.Name}</td>
              <td>{stock.Price != null ? `$${stock.Price.toFixed(2)}` : 'N/A'}</td>
              <td>{stock.Quantity}</td>
              <td>{stock.Price != null ? `$${(stock.Price * stock.Quantity).toFixed(2)}` : 'N/A'}</td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Portfolio;

import React, { useState } from 'react';

const AddStock = ({ handleAdd }) => {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStock = { Name: name, Symbol: symbol, Quantity: quantity };
    handleAdd(newStock);
    setName('');
    setSymbol('');
    setQuantity(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Symbol:</label>
        <input type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)} required />
      </div>
      <div>
        <label>Quantity:</label>
        <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} required />
      </div>
      <button type="submit">Add Stock</button>
    </form>
  );
};

export default AddStock;

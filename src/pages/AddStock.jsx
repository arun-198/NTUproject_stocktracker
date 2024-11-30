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
      onSubmit={handleSubmit}
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "white",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <label
          style={{
            fontWeight: "bold",
            width: "100px", // Set fixed width for consistent alignment
            textAlign: "right",
            marginRight: "10px",
          }}
        >
          Name:
        </label>
        <input
          style={{
            borderWidth: 1,
            borderColor: "gray",
            borderStyle: "solid",
            borderRadius: 5,
            width: 120,
            padding: "5px",
          }}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <label
          style={{
            fontWeight: "bold",
            width: "100px",
            textAlign: "right",
            marginRight: "10px",
          }}
        >
          Symbol:
        </label>
        <input
          style={{
            borderWidth: 1,
            borderColor: "gray",
            borderStyle: "solid",
            borderRadius: 5,
            width: 120,
            padding: "5px",
          }}
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          required
        />
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <label
          style={{
            fontWeight: "bold",
            width: "100px",
            textAlign: "right",
            marginRight: "10px",
          }}
        >
          Quantity:
        </label>
        <input
          style={{
            borderWidth: 1,
            borderColor: "gray",
            borderStyle: "solid",
            borderRadius: 5,
            width: 120,
            padding: "5px",
          }}
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          required
        />
      </div>
      <button
        type="submit"
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          backgroundColor: "#0da7a7",
          color: "white",
          cursor: "pointer",
          width: "50%",
        }}
      >
        Add Stock
      </button>
    </form>
  </div>
  );
};

export default AddStock;

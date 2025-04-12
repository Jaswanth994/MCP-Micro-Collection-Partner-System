// components/AddFunds.jsx
import React, { useState } from 'react';
import './DashboardSection.css';

const AddFunds = ({ onAddFunds }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || Number(amount) <= 0) return;
    onAddFunds(Number(amount));
    setAmount('');
  };

  return (
    <div className="dashboard-section">
      <h3>💰 Add Funds to MCP Wallet</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Add Funds</button>
      </form>
    </div>
  );
};

export default AddFunds;

import React from 'react';
import './TransactionList.css';

const transactions = [
  { id: 1, name: 'John Doe', amount: '+ ₹500', type: 'Credit', date: '2025-04-10' },
  { id: 2, name: 'Anita Singh', amount: '- ₹300', type: 'Debit', date: '2025-04-09' },
  { id: 3, name: 'Ravi Kumar', amount: '+ ₹1000', type: 'Credit', date: '2025-04-07' },
];

const TransactionList = () => {
  return (
    <div className="transaction-list">
      <h2 className="transaction-title">Transaction History</h2>
      <div className="table-container">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.id}>
                <td>{txn.name}</td>
                <td>{txn.type}</td>
                <td className={txn.amount.startsWith('+') ? 'credit' : 'debit'}>
                  {txn.amount}
                </td>
                <td>{txn.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;

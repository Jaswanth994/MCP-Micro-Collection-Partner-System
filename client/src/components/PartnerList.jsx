// components/PartnerList.jsx
import React from 'react';
import './DashboardSection.css';

const PartnerList = ({ partners, onDelete, orders }) => {
  return (
    <div className="dashboard-section">
      <h3>👥 Existing Pickup Partners</h3>
      {partners.length === 0 ? (
        <p>No partners available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Role</th>
              <th>Orders</th>
              <th>Completed</th>
              <th>Earnings (₹)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((p) => {
              const assignedOrders = orders.filter(o => o.assignedTo === p._id);
              const completed = assignedOrders.filter(o => o.status === 'Completed').length;
              const earnings = completed * 100;
              return (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{p.email}</td>
                  <td>{p.status}</td>
                  <td>{p.role}</td>
                  <td>{assignedOrders.length}</td>
                  <td>{completed}</td>
                  <td>{earnings}</td>
                  <td>
                    <button onClick={() => onDelete(p._id)}>🗑️</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PartnerList;

// components/OrderSection.jsx
import React, { useState } from 'react';
import './DashboardSection.css';

const OrderSection = ({ orders, partners, onAssign, onCreate }) => {
  const [form, setForm] = useState({ customerName: '', location: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(form);
    setForm({ customerName: '', location: '' });
  };

  return (
    <div className="dashboard-section">
      <h3>📋 Create Order</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={form.customerName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Order</button>
      </form>

      <h4>🗂 All Orders</h4>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Location</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Assign</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.customerName}</td>
                <td>{order.location}</td>
                <td>{order.status}</td>
                <td>{order.assignedTo?.name || 'Not Assigned'}</td>
                <td>
                  {!order.assignedTo && (
                    <select
                      onChange={(e) => onAssign(order._id, e.target.value)}
                      defaultValue=""
                    >
                      <option value="" disabled>Select partner</option>
                      {partners.map((p) => (
                        <option key={p._id} value={p._id}>{p.name}</option>
                      ))}
                    </select>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderSection;
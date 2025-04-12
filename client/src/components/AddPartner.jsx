// components/AddPartner.jsx
import React, { useState } from 'react';
import './DashboardSection.css';

const AddPartner = ({ onAddPartner }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Collector',
    commission: 100,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPartner(form);
    setForm({ name: '', email: '', password: '', role: 'Collector', commission: 100 });
  };

  return (
    <div className="dashboard-section">
      <h3>➕ Add Pickup Partner</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="Collector">Collector</option>
          <option value="Supervisor">Supervisor</option>
        </select>
        <input
          type="number"
          name="commission"
          placeholder="Commission per order (₹)"
          value={form.commission}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Partner</button>
      </form>
    </div>
  );
};

export default AddPartner;

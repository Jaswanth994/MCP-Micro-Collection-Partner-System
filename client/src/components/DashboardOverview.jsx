// components/DashboardOverview.jsx
import React from 'react';
import './DashboardSection.css';

const DashboardOverview = ({ dashboard, orders }) => {
  const totalPartners = dashboard.pickupPartners.length;
  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status === 'Completed').length;
  const pendingOrders = totalOrders - completedOrders;
  const activePartners = dashboard.pickupPartners.filter(p => p.status === 'active').length;
  const inactivePartners = totalPartners - activePartners;
  const earnings = completedOrders * 100;

  return (
    <div className="dashboard-section">
      <h2>📊 Dashboard Overview</h2>
      <div className="overview-grid">
        <div className="card">💰 Wallet Balance: ₹{dashboard.walletBalance}</div>
        <div className="card">👥 Total Partners: {totalPartners}</div>
        <div className="card">✅ Active Partners: {activePartners}</div>
        <div className="card">🚫 Inactive Partners: {inactivePartners}</div>
        <div className="card">📦 Total Orders: {totalOrders}</div>
        <div className="card">✅ Completed Orders: {completedOrders}</div>
        <div className="card">⏳ Pending Orders: {pendingOrders}</div>
        <div className="card">📈 Total Earnings: ₹{earnings}</div>
      </div>
    </div>
  );
};

export default DashboardOverview;

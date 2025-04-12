import React from 'react';
import './AnalyticsPanel.css';

const data = [
  { label: 'Jan', value: 300 },
  { label: 'Feb', value: 500 },
  { label: 'Mar', value: 450 },
  { label: 'Apr', value: 600 },
  { label: 'May', value: 750 },
];

const AnalyticsPanel = () => {
  const maxVal = Math.max(...data.map(d => d.value));

  return (
    <div className="analytics-panel">
      <h2 className="analytics-title">Monthly Funds Added</h2>
      <div className="bar-chart">
        {data.map((item, index) => (
          <div className="bar-item" key={index}>
            <div
              className="bar"
              style={{ height: `${(item.value / maxVal) * 100}%` }}
              title={`₹${item.value}`}
            ></div>
            <div className="label">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsPanel;

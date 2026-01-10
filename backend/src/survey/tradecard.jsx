// frontend/src/components/AdminDashboard/TradeCard.jsx
import React from 'react';
import './styles.css';

const TradeCard = ({ user, aiStatus }) => {
  return (
    <div className="trade-card">
      <h3>{user.name} (ID: {user.id})</h3>
      <p>AI Wallet Balance: ${aiStatus.balance.toFixed(2)}</p>
      <p>Daily Trades: {aiStatus.dailyTradeCount}</p>
      <p>Trade %: {aiStatus.tradePercent}%</p>
      <p>Confidence: ${aiStatus.confidence.toFixed(2)}</p>
      <p>Last Trade Result: ${aiStatus.lastTradeResult.toFixed(2)}</p>
    </div>
  );
};

export default TradeCard;
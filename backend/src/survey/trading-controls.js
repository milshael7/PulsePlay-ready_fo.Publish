import React, { useState } from 'react';
import { executeAITrade } from '../../backend/trading/trade.rules';
import { manualTrade } from '../../backend/trading/wallet.service';

export default function TradingControls({ userId }) {
  const [manualAmount, setManualAmount] = useState(0);
  const [manualMultiplier, setManualMultiplier] = useState(0.05); // 5% default

  const handleAITrade = () => {
    executeAITrade(userId);
    alert('AI trade executed!');
  };

  const handleManualTrade = () => {
    manualTrade(userId, manualAmount, manualMultiplier);
    alert('Manual trade executed!');
  };

  return (
    <div className="trading-controls">
      <h3>AI Trading Controls</h3>
      <button onClick={handleAITrade}>Execute AI Trade</button>

      <h3>Manual Trade Override</h3>
      <input type="number" value={manualAmount} onChange={e => setManualAmount(Number(e.target.value))} placeholder="Amount"/>
      <input type="number" step="0.01" value={manualMultiplier} onChange={e => setManualMultiplier(Number(e.target.value))} placeholder="Multiplier"/>
      <button onClick={handleManualTrade}>Execute Manual Trade</button>
    </div>
  );
}
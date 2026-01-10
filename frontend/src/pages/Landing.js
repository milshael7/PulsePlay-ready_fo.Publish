// frontend/src/components/TradeDashboard.js
import React, { useState } from 'react';
import WalletService from '../../../backend/src/trading/wallet.service';

// Single WalletService instance
const walletService = new WalletService();

// Sample user for testing
const sampleUser = { balance: 10000, name: "Player1" };

export default function TradeDashboard() {
  const [aiLog, setAiLog] = useState("");
  const [userAmount, setUserAmount] = useState("");
  const [userLog, setUserLog] = useState("");

  // Run automatic AI trade
  const runAITrade = () => {
    const result = walletService.executeAITrade(1000); // default AI trade amount
    setAiLog(`AI Trade Result: $${result.toFixed(2)}`);
  };

  // Run manual/human trade
  const runUserTrade = () => {
    const amount = parseFloat(userAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Enter a valid trade amount");
      return;
    }

    const result = walletService.manualTrade(sampleUser, amount);
    setUserLog(
      `Manual Trade Result: $${result.toFixed(2)} | New User Balance: $${sampleUser.balance.toFixed(2)}`
    );
    setUserAmount(""); // clear input
  };return (
    <div className="trade-dashboard">
      <h2>Trading Dashboard</h2>

      {/* AI Trading Section */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={runAITrade}>Run AI Trade</button>
        {aiLog && <p>{aiLog}</p>}
      </div>

      {/* Manual Trading Section */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="number"
          placeholder="Enter trade amount"
          value={userAmount}
          onChange={(e) => setUserAmount(e.target.value)}
        />
        <button onClick={runUserTrade}>Run Manual Trade</button>
        {userLog && <p>{userLog}</p>}
      </div>

      {/* Wallet Balances */}
      <div>
        <p>AI Wallet Balance: ${walletService.aiWallet.balance.toFixed(2)}</p>
        <p>Storehouse Balance: ${walletService.storehouse.balance.toFixed(2)}</p>
        <p>User Balance: ${sampleUser.balance.toFixed(2)}</p>
      </div>
    </div>
  );
}
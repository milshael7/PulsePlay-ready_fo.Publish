// frontend/src/components/TradeDashboard.js
import React, { useState } from 'react';
import WalletService from '../../../backend/src/trading/wallet.service';
import './TradeDashboard.css';

const walletService = new WalletService();
const sampleUser = { balance: 10000, name: "Player1" };

export default function TradeDashboard() {
  const [aiLog, setAiLog] = useState("");
  const [userAmount, setUserAmount] = useState("");
  const [userLog, setUserLog] = useState("");
  const [aiBalance, setAIBalance] = useState(walletService.aiWallet.balance);
  const [storehouseBalance, setStorehouseBalance] = useState(walletService.storehouse.balance);
  const [userBalance, setUserBalance] = useState(sampleUser.balance);
  const [aiFlash, setAIFlash] = useState(null); // null, 'profit', 'loss'
  const [userFlash, setUserFlash] = useState(null);

  const flashEffect = (setter, type) => {
    setter(type);
    setTimeout(() => setter(null), 500);
  };

  const runAITrade = () => {
    const result = walletService.executeAITrade(1000);
    setAiLog(`AI Trade Result: $${result.toFixed(2)}`);
    setAIBalance(walletService.aiWallet.balance);
    setStorehouseBalance(walletService.storehouse.balance);
    flashEffect(setAIFlash, result >= 0 ? 'profit' : 'loss');
  };

  const runUserTrade = () => {
    const amount = parseFloat(userAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Enter a valid trade amount");
      return;
    }
    const result = walletService.manualTrade(sampleUser, amount);
    setUserLog(`Manual Trade Result: $${result.toFixed(2)}`);
    setUserAmount("");
    setUserBalance(sampleUser.balance);
    setAIBalance(walletService.aiWallet.balance);
    setStorehouseBalance(walletService.storehouse.balance);
    flashEffect(setUserFlash, result >= 0 ? 'profit' : 'loss');
  };

  return (
    <div className="trade-dashboard">
      <h2>Trading Dashboard</h2>

      {/* AI Trading Section */}
      <div className={`trade-section ${aiFlash}`} style={{ marginB
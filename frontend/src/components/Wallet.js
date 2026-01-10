// frontend/src/components/Wallet.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Wallet({ userId }) {
  const [wallet, setWallet] = useState({ aiWallet:0, storehouse:0 });

  const fetchWallet = async () => {
    const res = await axios.get(`/api/users/${userId}/wallets`);
    setWallet(res.data);
  };

  const manualTrade = async (percentage) => {
    await axios.post(`/api/trading/manual`, { userId, percentage });
    fetchWallet();
  };

  const aiTrade = async () => {
    await axios.post(`/api/trading/ai`, { userId });
    fetchWallet();
  };

  useEffect(() => {
    fetchWallet();
    const interval = setInterval(aiTrade, 30000); // Auto AI trade every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h3>AI Wallet: ${wallet.aiWallet}</h3>
      <h3>Storehouse: ${wallet.storehouse}</h3>
      <button onClick={()=>manualTrade(30)}>Trade 30%</button>
      <button onClick={()=>manualTrade(50)}>Trade 50%</button>
      <button onClick={aiTrade}>Force AI Trade</button>
    </div>
  );
}
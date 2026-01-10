// frontend/src/components/AdminDashboard/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { 
  getAllUsers, 
  getAIStatus, 
  overrideAIWallet, 
  setDailyTradeLimit, 
  executeManualTrade 
} from "../../services/api";
import TradeCard from "./TradeCard";
import "./styles.css";

const socket = io("http://localhost:5000"); // adjust backend URL if needed

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [aiStatuses, setAIStatuses] = useState({});
  const [trades, setTrades] = useState([]);

  // Fetch initial data from API
  useEffect(() => {
    const fetchData = async () => {
      const allUsers = await getAllUsers();
      setUsers(allUsers);

      const statuses = {};
      for (const user of allUsers) {
        statuses[user.id] = await getAIStatus(user.id);
      }
      setAIStatuses(statuses);
    };
    fetchData();
  }, []);

  // Listen for real-time AI trade updates via Socket.IO
  useEffect(() => {
    socket.on("aiTradeUpdate", (trade) => {
      setTrades(prev => [trade, ...prev]);
      setAIStatuses(prevStatuses => ({
        ...prevStatuses,
        [trade.userId]: trade
      }));
    });

    return () => socket.off("aiTradeUpdate");
  }, []);

  // Admin control handlers
  const handleOverrideWallet = async (userId) => {
    const amount = prompt("Enter new AI wallet amount:");
    if (amount !== null) {
      await overrideAIWallet(userId, Number(amount));
      alert("Wallet updated!");
    }
  };

  const handleSetDailyLimit = async () => {
    const limit = prompt("Set owner daily trade limit (3-7):");
    if (limit !== null) {
      await setDailyTradeLimit(Number(limit));
      alert(`Daily trade limit updated to ${limit}`);
    }
  };

  const handleManualTrade = async (userId) => {
    const percentage = prompt("Trade % (3-50):");
    if (percentage !== null) {
      await executeManualTrade(userId, Number(percentage), "dummy");
      alert("Manual trade executed!");
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      <button onClick={handleSetDailyLimit}>Set Daily Trade Limit</button>

      <div className="users-grid">
        {users.map(user => {
          const aiStatus = aiStatuses[user.id] || {};
          return (
            <div key={user.id} className="user-card">
              <TradeCard user={user} aiStatus={aiStatus} />
              <button onClick={() => handleOverrideWallet(user.id)}>Override AI Wallet</button>
              <button onClick={() => handleManualTrade(user.id)}>Manual AI Trade</button>
            </div>
          );
        })}
      </div>

      <h2>Real-Time Trade Activity</h2>
      <table className="trade-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Balance</th>
            <th>Daily Trades</th>
            <th>Trade %</th>
            <th>Confidence</th>
            <th>Last Trade Result</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade, idx) => (
            <tr key={idx}>
              <td>{trade.userId}</td>
              <td>{trade.balance?.toFixed(2)}</td>
              <td>{trade.dailyTradeCount}</td>
              <td>{trade.tradePercent}</td>
              <td>{trade.confidence?.toFixed(2)}</td>
              <td>{trade.lastTradeResult?.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
// frontend/src/pages/Admin.js
import React, { useState } from 'react';
import AIHelper from '../components/AIHelper';

export default function Admin() {
  const [aiStatus, setAIStatus] = useState("Idle");
  const [walletAction, setWalletAction] = useState("");

  // Example functions for admin controls
  const runAITraining = () => setAIStatus("Training AI...");
  const resetWallets = () => setWalletAction("Wallets Reset!");
  const toggleTrading = () => alert("Trading toggled");

  return (
    <div className="admin-page" style={styles.page}>
      <AIHelper role="admin" />

      <h2 style={styles.title}>Admin Dashboard</h2>

      {/* AI Training Section */}
      <div style={styles.section}>
        <h3>AI Training</h3>
        <button style={styles.button} onClick={runAITraining}>Start AI Training</button>
        {aiStatus && <p>{aiStatus}</p>}
      </div>

      {/* Wallet Control Section */}
      <div style={styles.section}>
        <h3>Wallet Management</h3>
        <button style={styles.button} onClick={resetWallets}>Reset Wallets</button>
        {walletAction && <p>{walletAction}</p>}
      </div>

      {/* Trading Control Section */}
      <div style={styles.section}>
        <h3>Trading</h3>
        <button style={styles.button} onClick={toggleTrading}>Toggle Trading</button>
      </div>

      {/* Security / Overrides */}
      <div style={styles.section}>
        <h3>Security Overrides</h3>
        <p>Placeholder for admin security controls</p>
      </div>
    </div>
  );
}

const styles = {
  page: { padding: '20px', fontFamily: 'Arial, sans-serif' },
  title: { fontSize: '2rem', marginBottom: '20px' },
  section: { marginBottom: '25px' },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    marginTop: '10px',
    cursor: 'pointer',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    transition: 'background 0.3s',
  },
};
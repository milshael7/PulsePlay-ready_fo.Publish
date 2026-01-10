// frontend/src/pages/Store.js
import React, { useEffect, useState } from 'react';
import StoreItem from '../components/StoreItem';
import './Store.css';

export default function Store({ user }) {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [aiBalance, setAIBalance] = useState(0);
  const [storehouseBalance, setStorehouseBalance] = useState(0);
  const [tradeResult, setTradeResult] = useState(null);

  useEffect(() => {
    fetchStoreItems();
    fetchBalances();
  }, []);

  // -----------------------
  // Fetch products
  // -----------------------
  async function fetchStoreItems() {
    const res = await fetch('/api/store/items');
    const data = await res.json();
    setItems(data);
  }

  // -----------------------
  // Balances
  // -----------------------
  async function fetchBalances() {
    const res = await fetch('/api/store/balances');
    const data = await res.json();
    setAIBalance(data.aiWallet);
    setStorehouseBalance(data.storehouse);
  }

  async function aiTrade() {
    const res = await fetch('/api/store/ai-trade', { method: 'POST' });
    const result = await res.json();
    setTradeResult(result);
    fetchBalances();
  }

  async function manualTrade(amount) {
    const res = await fetch('/api/store/manual-trade', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, amount })
    });
    const result = await res.json();
    setTradeResult(result);
    fetchBalances();
  }

  // -----------------------
  // UI
  // -----------------------
  return (
    <div className="store-page">
      <h1>{user?.name}'s Store</h1>

      {/* Balances */}
      <div className="balance-section">
        <p>AI Wallet Balance: ${aiBalance}</p>
        <p>Storehouse Balance: ${storehouseBalance}</p>
        <button onClick={aiTrade}>AI Auto Trade</button>
        <button onClick={() => manualTrade(500)}>Manual Trade $500</button>
      </div>

      {tradeResult !== null && (
        <p className="trade-result">
          Last Trade Result: ${Number(tradeResult).toFixed(2)}
        </p>
      )}

      {/* PRODUCT SHOW (single product view) */}
      {selectedItem && (
        <div className="product-show-overlay">
          <div className="product-show-card">
            <button
              className="close-btn"
              onClick={() => setSelectedItem(null)}
            >
              ✕
            </button>

            <StoreItem
              item={selectedItem}
              userId={user.id}
              isExpanded
            />

            {/* Other products selector */}
            <div className="related-products">
              <h4>More products</h4>
              <div className="related-grid">
                {items
                  .filter(i => i._id !== selectedItem._id)
                  .map(item => (
                    <div
                      key={item._id}
                      className="related-item"
                      onClick={() => setSelectedItem(item)}
                    >
                      <img src={item.images?.[0]} alt={item.name} />
                      <p>{item.name}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STORE GRID */}
      {!selectedItem && (
        <div className="store-items-grid">
          {items.map(item => (
            <StoreItem
              key={item._id}
              item={item}
              userId={user.id}
              onSelect={() => setSelectedItem(item)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
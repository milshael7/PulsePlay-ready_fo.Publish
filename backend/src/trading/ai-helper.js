// frontend/src/components/AIHelper.js
import React, { useEffect, useState } from 'react';

export default function AIHelper({ role }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Simulate AI onboarding or dashboard guidance
    if(role === 'user') {
      setMessages([
        "Welcome! Upload profile picture first.",
        "Add connections to start your network.",
        "Feed shows network-first content.",
        "Go live or start selling in your store.",
      ]);
    } else if(role === 'manager') {
      setMessages(["Manager: Monitor user analytics, trust scoring, engagement."]);
    } else if(role === 'admin') {
      setMessages(["Admin: Full access, control wallets, AI training, security override."]);
    }
  }, [role]);

  return (
    <div className={`ai-helper ${role}`}>
      {messages.map((msg, index) => (
        <div key={index} className="ai-message">{msg}</div>
      ))}
    </div>
  );
}
import React, { useEffect, useState } from 'react';

export default function Inbox({ user }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/messages/${user.id}`)
      .then(res => res.json())
      .then(data => setMessages(data));
  }, [user]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Inbox</h2>

      {messages.length === 0 && <p>No messages yet</p>}

      {messages.map(msg => (
        <div key={msg._id} style={{
          border: '1px solid #ddd',
          padding: 10,
          marginBottom: 10,
          borderRadius: 6
        }}>
          <p><strong>From:</strong> {msg.senderId?.name || 'User'}</p>
          <p><strong>Product:</strong> {msg.productId?.name}</p>
          <p>{msg.content}</p>
        </div>
      ))}
    </div>
  );
}
import React, { useEffect, useState } from 'react';

export default function Dashboard({ user }) {
  const [products, setProducts] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!user) return;

    fetch(`/api/store/owner/${user.id}`)
      .then(res => res.json())
      .then(setProducts);

    fetch(`/api/messages/${user.id}`)
      .then(res => res.json())
      .then(setMessages);
  }, [user]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Owner Dashboard</h2>

      <h3>Your Products</h3>
      {products.map(p => (
        <div key={p._id}>
          {p.name} — ${p.price}
        </div>
      ))}

      <h3>Messages</h3>
      {messages.map(m => (
        <div key={m._id}>
          {m.content}
        </div>
      ))}
    </div>
  );
}
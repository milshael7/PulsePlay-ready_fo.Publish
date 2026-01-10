import React, { useState } from 'react';

export default function Checkout({ user, product }) {
  const [status, setStatus] = useState(null);

  async function handlePurchase() {
    const res = await fetch('/api/store/purchase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id,
        productId: product._id
      })
    });

    const data = await res.json();
    setStatus(data.message);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Checkout</h2>
      <p>{product.name}</p>
      <p>Price: ${product.price}</p>

      <button onClick={handlePurchase}>Confirm Purchase</button>

      {status && <p>{status}</p>}
    </div>
  );
}
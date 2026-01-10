// frontend/src/components/MessageOwner.js
import React, { useState } from 'react';

export default function MessageOwner({ product, user }) {
  const [text, setText] = useState('');

  const send = async () => {
    await fetch('/api/message/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fromUserId: user.id,
        toUserId: product.ownerId,
        productId: product._id,
        message: text
      })
    });
    setText('');
  };

  return (
    <div className="message-owner">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Ask about this product..."
      />
      <button onClick={send}>Send</button>
    </div>
  );
}
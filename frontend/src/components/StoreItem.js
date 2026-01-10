// frontend/src/components/StoreItem.js
import React, { useEffect, useRef, useState } from 'react';
import './StoreItem.css';

export default function StoreItem({
  item,
  userId,
  onSelect,
  isExpanded = false
}) {
  const audioRef = useRef(null);
  const [musicOn, setMusicOn] = useState(true);
  const [message, setMessage] = useState('');

  // -------------------------
  // Music control (product show only)
  // -------------------------
  useEffect(() => {
    if (!isExpanded || !item?.music) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(item.music);
      audioRef.current.loop = true;
    }

    if (musicOn) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }

    return () => {
      audioRef.current?.pause();
    };
  }, [isExpanded, musicOn, item]);

  // -------------------------
  // Send message to owner inbox
  // -------------------------
  async function handleSendMessage() {
    if (!message.trim()) return;

    await fetch('/api/message/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        senderId: userId,
        receiverId: item.ownerId,
        productId: item._id,
        content: message
      })
    });

    setMessage('');
    alert('Message sent to owner inbox');
  }

  // -------------------------
  // PREVIEW CARD (store grid)
  // -------------------------
  if (!isExpanded) {
    return (
      <div
        className="store-item-card"
        onClick={onSelect}
      >
        <img src={item.images?.[0]} alt={item.name} />
        <h3>{item.name}</h3>
        <p>${item.price}</p>
      </div>
    );
  }

  // -------------------------
  // PRODUCT SHOW (expanded)
  // -------------------------
  return (
    <div className="product-show-content">
      <img
        src={item.images?.[0]}
        alt={item.name}
        className="product-main-image"
      />

      <h2>{item.name}</h2>
      <p className="price">${item.price}</p>

      <p><strong>Brand:</strong> {item.brand}</p>
      <p><strong>Description:</strong> {item.description}</p>
      <p><strong>Stock:</strong> {item.stock}</p>

      {/* Music toggle */}
      {item.music && (
        <div className="music-toggle">
          <label>
            🎵 Music
            <input
              type="checkbox"
              checked={musicOn}
              onChange={() => setMusicOn(!musicOn)}
            />
          </label>
        </div>
      )}

      {/* Message owner */}
      <div className="message-owner">
        <textarea
          placeholder="Message the seller about this product…"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>
          Send Message
        </button>
      </div>
    </div>
  );
}
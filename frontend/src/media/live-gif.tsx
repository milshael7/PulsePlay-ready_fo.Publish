// frontend/src/components/LiveGifts.tsx
import React, { useState } from 'react';
import './LiveGifts.css';

interface Gift {
  id: number;
  name: string;
  price: number; // 0 = free
  icon: string;  // path to GIF or icon
}

interface LiveGiftsProps {
  onSendGift: (gift: Gift) => void;
}

const gifts: Gift[] = [
  { id: 1, name: 'Heart', price: 0, icon: '/assets/icons/heart.gif' },
  { id: 2, name: 'Flower', price: 5, icon: '/assets/icons/flower.gif' },
  { id: 3, name: 'Wine', price: 10, icon: '/assets/icons/wine.gif' },
  { id: 4, name: 'Kiss', price: 15, icon: '/assets/icons/kiss.gif' },
  { id: 5, name: 'Lion', price: 50, icon: '/assets/icons/lion.gif' },
  { id: 6, name: 'Running Horse', price: 75, icon: '/assets/icons/horse.gif' },
];

export default function LiveGifts({ onSendGift }: LiveGiftsProps) {
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);

  const handleGiftClick = (gift: Gift) => {
    setSelectedGift(gift);
    onSendGift(gift);
  };

  return (
    <div className="live-gifts-container">
      <h3>Send a Gift</h3>
      <div className="gifts-grid">
        {gifts.map((gift) => (
          <button
            key={gift.id}
            className="gift-button"
            onClick={() => handleGiftClick(gift)}
          >
            <img src={gift.icon} alt={gift.name} />
            <span>{gift.price === 0 ? 'Free' : `$${gift.price}`}</span>
          </button>
        ))}
      </div>{/* Gift effects / side animations */}
      <div className="gift-effects">
        {selectedGift && (
          <div className="gift-effect">
            <img
              src={selectedGift.icon}
              alt={selectedGift.name}
              className="gift-animation"
            />
            <span className="gift-message">
              {selectedGift.price === 0
                ? `sent a ${selectedGift.name}!`
                : `sent a $${selectedGift.price} ${selectedGift.name}!`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}<div className="live-gif-container">
  <img src="/assets/gifs/flower.gif" className="gif-item rotate" data-price="$5" />
  <img src="/assets/gifs/wine.gif" className="gif-item" data-price="$10" />
</div>
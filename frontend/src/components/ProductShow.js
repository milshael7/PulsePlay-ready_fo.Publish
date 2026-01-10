// frontend/src/components/ProductShow.js
import React, { useState } from 'react';
import RadioPlayer from './RadioPlayer';
import MessageOwner from './MessageOwner';

export default function ProductShow({ product, allProducts, onClose, user }) {
  const [current, setCurrent] = useState(product);

  return (
    <div className="product-show-overlay">
      <button className="close-btn" onClick={onClose}>✕</button>

      <h2>{current.name}</h2>
      <img src={current.images[0]} alt="" />
      <p>{current.description}</p>
      <p>Stock: {current.stock}</p>

      {/* MUSIC (OPTIONAL) */}
      {current.music?.length > 0 && (
        <RadioPlayer playlist={current.music} />
      )}

      {/* MESSAGE OWNER */}
      <MessageOwner product={current} user={user} />

      {/* RELATED PRODUCTS */}
      <div className="related-products">
        {allProducts.map(p => (
          <img
            key={p._id}
            src={p.images[0]}
            alt=""
            onClick={() => setCurrent(p)}
          />
        ))}
      </div>
    </div>
  );
}
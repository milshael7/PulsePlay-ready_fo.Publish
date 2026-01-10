// frontend/src/components/ProductShowPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import './ProductShowPage.css';

export default function ProductShowPage({ products, initialProductIndex = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(initialProductIndex);
  const [musicOn, setMusicOn] = useState(true);
  const audioRef = useRef(null);

  const currentProduct = products[currentIndex];

  // Play music if enabled
  useEffect(() => {
    if (musicOn && currentProduct?.music?.length > 0) {
      audioRef.current.src = currentProduct.music[0]; // start with first track
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [currentIndex, musicOn, currentProduct]);

  // Rotate music tracks every 30 seconds if more than one
  useEffect(() => {
    if (!currentProduct?.music || currentProduct.music.length <= 1) return;
    let trackIndex = 0;
    const interval = setInterval(() => {
      if (musicOn) {
        trackIndex = (trackIndex + 1) % currentProduct.music.length;
        audioRef.current.src = currentProduct.music[trackIndex];
        audioRef.current.play();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [currentProduct, musicOn]);

  return (
    <div className="product-show-page">
      <div className="product-main">
        <h2>{currentProduct.name}</h2>
        <img
          src={currentProduct.image}
          alt={currentProduct.name}
          className="main-image"
        />
        <p>Price: ${currentProduct.price}</p>
        <p>Stock: {currentProduct.stock}</p>
        <p>Description: {currentProduct.description}</p>

        <div className="product-options">
          <label>
            Music:
            <input
              type="checkbox"
              checked={musicOn}
              onChange={() => setMusicOn(!musicOn)}
            />
          </label>
        </div>

        <audio ref={audioRef} />
      </div>

      <div className="other-products">
        <h3>Other products by this seller:</h3>
        <div className="product-list">
          {products.map((p, idx) => (
            <div
              key={p.id}
              className={`product-thumb ${
                idx === currentIndex ? 'active' : ''
              }`}
              onClick={() => setCurrentIndex(idx)}
            >
              <img src={p.image} alt={p.name} />
              <p>{p.name}</p>
              <p>${p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
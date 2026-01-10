import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LivePlayer from '../components/LivePlayer';
import LiveProduct from '../components/LiveProduct';
import '../style/Live.css';
import '../style/live-products.css';

interface LivePageProps {
  userId: string;
}

interface GifReaction {
  id: string;
  name: string;
  src: string;
  price: number;
}

interface Ad {
  id: string;
  src: string;
}

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

export default function Live({ userId }: LivePageProps) {
  const [reactions, setReactions] = useState<GifReaction[]>([]);
  const [userGifts, setUserGifts] = useState<GifReaction[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // GIF reactions
    setReactions([
      { id: 'heart', name: 'Heart', src: '/assets/gifs/heart.gif', price: 0 },
      { id: 'flower', name: 'Flower', src: '/assets/gifs/flower.gif', price: 5 },
      { id: 'wine', name: 'Wine', src: '/assets/gifs/wine.gif', price: 10 },
      { id: 'kiss', name: 'Kiss', src: '/assets/gifs/kiss.gif', price: 15 },
      { id: 'fire', name: 'Fire', src: '/assets/gifs/fire.gif', price: 20 },
      { id: 'lion', name: 'Lion', src: '/assets/gifs/lion.gif', price: 30 },
      { id: 'horse', name: 'Horse', src: '/assets/gifs/horse.gif', price: 35 },
    ]);

    // Ads
    setAds([
      { id: 'ad1', src: '/assets/ads/ad1.gif' },
      { id: 'ad2', src: '/assets/ads/ad2.gif' },
    ]);

    // Products
    setProducts([
      { id: 1, name: "Gaming Mouse", image: "/assets/images/mouse.png", price: 49.99 },
      { id: 2, name: "Gaming Keyboard", image: "/assets/images/keyboard.png", price: 89.99 }
    ]);

    // Rotate ads
    const interval = setInterval(() => {
      setCurrentAdIndex(prev => (prev + 1) % ads.length);
    }, 30000);

    return () => clearInterval(interval);
  }, [ads.length]);

  const sendGift = (gift: GifReaction) => {
    setUserGifts(prev => [...prev, gift]);
    // Optional: deduct balance, trigger animation
  };

  return (
    <div className="live-page">
      <Navbar />

      <main className="live-main">
        <div className="live-player-container">
          <LivePlayer userId={userId} />

          {/* Rotating ads */}
          {ads[currentAdIndex] && (
            <div
              className="side-ad left"
              style={{ backgroundImage: `url(${ads[currentAdIndex].src})` }}
            />
          )}
          {ads[(currentAdIndex + 1) % ads.length] && (
            <div
              className="side-ad right"
              style={{ backgroundImage: `url(${ads[(currentAdIndex + 1) % ads.length].src})` }}
            />
          )}

          {/* Product overlay */}
          <div className="live-product-container">
            {products.map(product => (
              <LiveProduct key={product.id} product={product} />
            ))}
          </div>

          {/* Filter overlay */}
          <div className="filter-overlay"></div>

          {/* GIF reactions on-screen */}
          {userGifts.map(gif => (
            <div
              key={gif.id + Date.now()}
              className={gif.price > 0 ? "paid-gif" : "reaction"}
            >
              <img src={gif.src} alt={gif.name} />
              {gif.price > 0 && <span>${gif.price}</span>}
            </div>
          ))}
        </div>

        {/* GIF buttons */}
        <div className="gif-reactions">
          {reactions.map(gif => (
            <button key={gif.id} onClick={() => sendGift(gif)}>
              <img src={gif.src} alt={gif.name} />
              {gif.price > 0 && <span>${gif.price}</span>}
            </button>
          ))}
        </div>

        {/* Like / share buttons */}
        <div className="live-controls">
          <button>Like</button>
          <button>Share</button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
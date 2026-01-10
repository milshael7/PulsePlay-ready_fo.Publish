// frontend/src/components/LivePlayer.tsx
import React, { useEffect, useRef, useState } from 'react';

export default function LivePlayer({ userId }: { userId: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');

  // Example: Initialize live stream
  useEffect(() => {
    async function startStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
        setIsStreaming(true);
      } catch (err) {
        console.error('Live stream failed:', err);
      }
    }

    startStream();
    return () => {
      // Stop all tracks when leaving
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages(prev => [...prev, `You: ${newMessage}`]);
      setNewMessage('');
      // Here you could also call backend to broadcast to other viewers
    }
  };

  return (
    <div className="live-player-container" style={{ display: 'flex', gap: '20px' }}>
      <div className="video-section" style={{ flex: 3 }}>
        <h2>Live Stream</h2>
        <video ref={videoRef} autoPlay muted style={{ width: '100%', borderRadius: '10px', backgroundColor: '#000' }} />
        <p>Status: {isStreaming ? 'Streaming Live' : 'Loading...'}</p>
      </div>

      <div className="chat-section" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h3>Chat</h3>
        <div className="chat-box" style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
          {chatMessages.map

// frontend/src/components/LivePlayer.js
import React, { useState, useEffect } from 'react';
import './live-player.css'; // Link to CSS for this component

export default function LivePlayer({ userId }) {
  const [liveStreamUrl, setLiveStreamUrl] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [gifts, setGifts] = useState([]);
  const [viewerCount, setViewerCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [ads, setAds] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('none');

  useEffect(() => {
    // TODO: Fetch live stream URL from backend
    setLiveStreamUrl(`/api/live/${userId}`);

    // TODO: Load initial products from store
    setProducts([
      { id: 1, name: "Gaming Mouse", price: 25 },
      { id: 2, name: "RGB Keyboard", price: 50 },
    ]);

    // TODO: Load rotating ads
    setAds([
      { id: 1, src: '/assets/videos/ad1.mp4' },
      { id: 2, src: '/assets/videos/ad2.mp4' },
    ]);
  }, [userId]);

  const sendGift = (type, price) => {
    const gift = { id: Date.now(), type, price, sender: "Viewer1" };
    setGifts(prev => [...prev, gift]);
    // TODO: Notify backend about gift
  };

  const applyFilter = (filterName) => {
    setSelectedFilter(filterName);
  };
import React, { useState, useEffect } from 'react';
import './live.css'; // Base CSS for live page
import './live-gif-container.css'; // GIF positions & animations

interface LivePlayerProps {
  userId: string;
}

interface Gift {
  name: string;
  type: 'free' | 'paid';
  price?: number;
  icon: string; // URL or local asset
}

interface Product {
  id: string;
  name: string;
  image: string;
  link: string;
}

export default function LivePlayer({ userId }: LivePlayerProps) {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [ads, setAds] = useState<string[]>([]); // rotating ad URLs
  const [activeAd, setActiveAd] = useState(0);

  useEffect(() => {
    // Load GIFs
    setGifts([
      { name: 'Heart', type: 'free', icon: '/assets/gifts/heart.gif' },
      { name: 'Flower', type: 'paid', price: 5, icon: '/assets/gifts/flower.gif' },
      { name: 'Wine', type: 'paid', price: 10, icon: '/assets/gifts/wine.gif' },
      { name: 'Lion', type: 'paid', price: 50, icon: '/assets/gifts/lion.gif' },
      { name: 'Horse', type: 'paid', price: 75, icon: '/assets/gifts/horse.gif' }
    ]);

    // Load products for this live streamer
    setProducts([
      { id: 'p1', name: 'Gaming Mouse', image: '/assets/products/mouse.jpg', link: '/store/p1' },
      { id: 'p2', name: 'Headset', image: '/assets/products/headset.jpg', link: '/store/p2' }
    ]);

    // Load ads
    setAds([
      '/assets/ads/ad1.mp4',
      '/assets/ads/ad2.mp4'
    ]);

    // Rotate ads every 30 seconds
    const interval = setInterval(() => {
      setActiveAd(prev => (prev + 1) % ads.length);
    }, 30000);

    return () => clearInterval(interval);
  }, []);
// frontend/src/components/LivePlayer.js
import React, { useState, useEffect } from 'react';
import './liveplayer.css';

export default function LivePlayer({ userId }) {
  const [gifts, setGifts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [ads, setAds] = useState([]);
  const [activeAds, setActiveAds] = useState([null, null]);
  const [liveMessages, setLiveMessages] = useState([]);

  // Example: available GIFs (free & paid)
  const availableGifts = [
    { name: 'Heart', type: 'free', icon: '❤️', price: 0 },
    { name: 'Flower', type: 'paid', icon: '🌸', price: 5 },
    { name: 'Wine', type: 'paid', icon: '🍷', price: 10 },
    { name: 'Kiss', type: 'paid', icon: '💋', price: 15 },
    { name: 'Fire', type: 'paid', icon: '🔥', price: 20 },
    { name: 'Lion', type: 'paid', icon: '🦁', price: 50 },
    { name: 'Running Horse', type: 'paid', icon: '🐎', price: 40 },
  ];

  // Example: filters
  const availableFilters = [
    { name: 'Bright', className: 'filter-bright' },
    { name: 'Smooth', className: 'filter-smooth' },
    { name: 'Cool Tone', className: 'filter-cool' },
  ];

  // Example: rotating ads (videos or GIFs)
  const availableAds = [
    { id: 1, src: '/assets/ads/ad1.gif', alt: 'Ad 1' },
    { id: 2, src: '/assets/ads/ad2.gif', alt: 'Ad 2' },
    { id: 3, src: '/assets/ads/ad3.gif', alt: 'Ad 3' },
  ];

  useEffect(() => {
    // Initialize rotating ads
    setActiveAds([availableAds[0], availableAds[1]]);
    const adInterval = setInterval(() => {
      setActiveAds(prev => {
        const nextIndex1 = (availableAds.indexOf(prev[0]) + 1) % availableAds.length;
        const nextIndex2 = (availableAds.indexOf(prev[1]) + 1) % availableAds.length;
        return [availableAds[nextIndex1], availableAds[nextIndex2]];
      });
    }, 30000); // 30 seconds

    return () => clearInterval(adInterval);
  }, []);
return (
    <div className="liveplayer-container">
      {/* Live video section */}
      <div className="live-video">
        <video
          id="live-stream"
          autoPlay
          controls
          className={filters.map(f => f.className).join(' ')}
        >
          <source src={`/live/${userId}.mp4`} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>

        {/* Rotating ads */}
        <div className="live-ads">
          {activeAds.map((ad, index) => (
            <img key={index} src={ad.src} alt={ad.alt} className="ad-gif" />
          ))}
        </div>

        {/* Live GIFs / Gifts */}
        <div className="live-gifts">
          {gifts.map((gift, index) => (
            <span key={index} className={`gift ${gift.type}`}>
              {gift.icon} {gift.price > 0 ? `$${gift.price}` : ''}
            </span>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="live-controls">
        <div className="gift-selector">
          {availableGifts.map((gift, idx) => (
            <button
              key={idx}
              onClick={() => setGifts([...gifts, gift])}
              className={gift.type}
            >
              {gift.icon} {gift.price > 0 ? `$${gift.price}` : ''}
            </button>
          ))}
        </div>

        <div className="filter-selector">
          {availableFilters.map((filter, idx) => (
            <button
              key={idx}
              onClick={() =>
                setFilters(prev =>
                  prev.find(f => f.name === filter.name)
                    ? prev.filter(f => f.name !== filter.name)
                    : [...prev, filter]
                )
              }
            >
              {filter.name}
            </button>
          ))}
        </div>
      </div>

      {/* Live messages */}
      <div className="live-messages">
        {liveMessages.map((msg, idx) => (
          <p key={idx}>{msg}</p>
        ))}
      </div>
    </div>
  );
}import React, { useEffect, useState } from 'react';
import './live-gif-container.css';

export default function LivePlayer({ userId }) {
  const [reactions, setReactions] = useState([]);
  const [ads, setAds] = useState([]);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('none');

  // Rotate ads every 30 seconds
  useEffect(() => {
    const adList = [
      '/assets/ads/ad1.gif',
      '/assets/ads/ad2.gif',
      '/assets/ads/ad3.gif',
    ];
    let index = 0;
    setAds([adList[0], adList[1]]);
    const interval = setInterval(() => {
      index = (index + 1) % adList.length;
      setAds([adList[index], adList[(index + 1) % adList.length]]);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Example: add reaction (triggered from elsewhere in your app)
  const addReaction = (type, price = 0) => {
    setReactions((prev) => [...prev, { type, price, id: Date.now() }]);
    // remove after animation (example: 5s)
    setTimeout(() => setReactions((prev) => prev.filter(r => r.id !== Date.now())), 5000);
  };

  return (
    <div className="live-player-container">
      {/* Live Video Feed */}
      <video className={`live-video ${filter}`} autoPlay muted />

      {/* Ads on each side */}
      <div className="live-ad left-ad">
        {ads[0] && <img src={ads[0]} alt="ad-left" />}
      </div>
      <div className="live-ad right-ad">
        {ads[1] && <img src={ads[1]} alt="ad-right" />}
      </div>

      {/* Reactions */}
      <div className="live-reactions">
        {reactions.map(r => (
          <div key={r.id} className={`reaction ${r.type}`}>
            {r.type} {r.price > 0 && `$${r.price}`}
          </div>
        ))}
      </div>

      {/* Products promoted by streamer */}
      <div className="live-products">
        {products.map((p, idx) => (
          <div key={idx} className="product">
            <img src={p.image} alt={p.name} />
            <p>{p.name} - ${p.price}</p>
          </div>
        ))}
      </div>

      {/* Filter selector */}
      <select onChange={(e) => setFilter(e.target.value)} value={filter}>
        <option value="none">None</option>
        <option value="beauty">Beauty Filter</option>
        <option value="bright">Brightness Boost</option>
        <option value="vivid">Vivid Colors</option>
      </select>
    </div>
  );
}
<div className="reaction heart">
  ❤️
  <span className="price-tag">$5</span>
</div>
<div className="live-player-container">
  {/* Existing live video / GIFs / reactions code */}

  {/* Small donation drop-down & send button */}
  <div className="live-donation">
    <select>
      <option value="1">$1</option>
      <option value="2">$2</option>
      <option value="3">$3</option>
      <option value="4">$4</option>
    </select>
    <button>Send</button>
  </div>
</div>
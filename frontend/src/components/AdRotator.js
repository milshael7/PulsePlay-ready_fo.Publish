// frontend/src/components/AdRotator.js
import React, { useState, useEffect } from 'react';

export default function AdRotator({ isPayingUser, userBehavior }) {
  const [ads, setAds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAd, setCurrentAd] = useState(null);

  // Fetch ads from backend API
  useEffect(() => {
    if (!isPayingUser) return;

    async function fetchAds() {
      try {
        const res = await fetch('/api/store/ads');
        const data = await res.json();
        setAds(data || []);
      } catch (err) {
        console.error('Failed to load ads', err);
      }
    }

    fetchAds();
  }, [isPayingUser]);

  // Rotate ads every 30 seconds
  useEffect(() => {
    if (!isPayingUser || !ads.length) return;

    const interval = setInterval(async () => {
      try {
        // Call backend API to select best ad (AI logic)
        const res = await fetch('/api/store/select-best-ad', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userBehavior })
        });
        const bestAd = await res.json();
        setCurrentAd(bestAd);

        // fallback: simple rotation if API fails
        setCurrentIndex(prev => (prev + 1) % ads.length);
      } catch (err) {
        console.error('AI ad selection failed', err);
        setCurrentIndex(prev => (prev + 1) % ads.length);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isPayingUser, ads, userBehavior]);

  if (!isPayingUser || (!ads.length && !currentAd)) return null;

  return (
    <div className="ad-rotator">
      <p>{currentAd ? currentAd.content : ads[currentIndex]?.content}</p>
    </div>
  );
}
// frontend/src/pages/Feed.js
import React, { useEffect, useState } from 'react';
import VideoCard from '../components/VideoCard';

export default function Feed({ userId }) {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    // Fetch feed from backend: network -> live -> global
    async function fetchFeed() {
      try {
        const res = await fetch(`/api/feed?userId=${userId}`);
        const data = await res.json();
        setFeed(data || []);
      } catch (err) {
        console.error('Failed to fetch feed', err);
      }
    }
    if (userId) fetchFeed();
  }, [userId]);

  return (
    <div className="feed-page">
      {feed.length > 0 ? (
        feed.map(item => <VideoCard key={item.id} video={item} />)
      ) : (
        <p>No feed available.</p>
      )}
    </div>
  );
}
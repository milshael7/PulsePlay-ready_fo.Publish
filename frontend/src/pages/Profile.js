// frontend/src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import StoreItem from '../components/StoreItem';
import VideoCard from '../components/VideoCard';
import AIHelper from '../components/AIHelper';
import AdRotator from '../components/AdRotator';

export default function Profile({ userId, isPayingUser, userBehavior }) {
  const [videos, setVideos] = useState([]);
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    // Fetch user videos & pictures from backend
    async function fetchProfileData() {
      try {
        const resVideos = await fetch(`/api/users/${userId}/videos`);
        const videosData = await resVideos.json();
        setVideos(videosData || []);

        const resPics = await fetch(`/api/users/${userId}/pictures`);
        const picsData = await resPics.json();
        setPictures(picsData || []);
      } catch (err) {
        console.error('Failed to fetch profile data', err);
      }
    }

    fetchProfileData();
  }, [userId]);

  return (
    <div className="profile-page">
      {/* AI onboarding / helper */}
      <AIHelper role="user" userId={userId} />

      <h2>User Profile</h2>

      {/* Videos Section: show up to 3 most recent */}
      <div className="videos">
        {videos.slice(0, 3).map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {/* Pictures Section */}
      <div className="pictures">
        {pictures.map(pic => (
          <img key={pic.id} src={pic.url} alt="User content" />
        ))}
      </div>

      {/* Store / Items Section */}
      <StoreItem userId={userId} />

      {/* AI-rotated ads */}
      <AdRotator isPayingUser={isPayingUser} userBehavior={userBehavior} />
    </div>
  );
}
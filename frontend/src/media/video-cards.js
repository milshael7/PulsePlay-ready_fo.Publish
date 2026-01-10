import React, { useState } from "react";
import VideoCard from "./VideoCard";
import "./VideoCards.css";

const videos = [
  {
    id: 1,
    title: "Amazing Nature",
    description: "Explore the beauty of nature in this short clip.",
    thumbnail: "https://via.placeholder.com/300x200?text=Nature",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID1"
  },
  {
    id: 2,
    title: "Tech Review",
    description: "Latest gadgets and tech news reviewed.",
    thumbnail: "https://via.placeholder.com/300x200?text=Tech",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID2"
  },
  {
    id: 3,
    title: "Cooking Tips",
    description: "Quick and easy cooking tips for beginners.",
    thumbnail: "https://via.placeholder.com/300x200?text=Cooking",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID3"
  }
];

const VideoCards = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <>
      <div className="video-container">
        {videos.map(video => (
          <VideoCard
            key={video.id}
            video={video}
            onClick={setSelectedVideo}
          />
        ))}
      </div>

      {selectedVideo && (
        <div className="modal-overlay" onClick={() => setSelectedVideo(null)}>
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
          >
            <h2>{selectedVideo.title}</h2>
            <p>{selectedVideo.description}</p>
            <iframe
              src={selectedVideo.videoUrl}
              title={selectedVideo.title}
              width="100%"
              height="300"
              frameBorder="0"
              allowFullScreen
            />
            <button
              className="close-button"
              onClick={() => setSelectedVideo(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoCards;
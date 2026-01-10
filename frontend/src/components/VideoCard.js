import React from "react";
import "./VideoCards.css";

const VideoCard = ({ video, onClick }) => {
  return (
    <div className="video-card" onClick={() => onClick(video)}>
      <img
        src={video.thumbnail}
        alt={video.title}
        className="video-thumbnail"
      />
      <h3 className="video-title">{video.title}</h3>
      <p className="video-description">{video.description}</p>
    </div>
  );
};

export default VideoCard;
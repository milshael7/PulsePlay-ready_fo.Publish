// frontend/src/components/RadioPlayer.js
import React, { useEffect, useState } from 'react';

export default function RadioPlayer({ playlist }) {
  const [index, setIndex] = useState(0);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!enabled) return;
    const audio = new Audio(playlist[index]);
    audio.play();
    audio.onended = () =>
      setIndex((index + 1) % playlist.length);
    return () => audio.pause();
  }, [index, enabled]);

  return (
    <div className="radio-player">
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Mute' : 'Play Music'}
      </button>
    </div>
  );
}
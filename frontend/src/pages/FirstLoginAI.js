import React, { useEffect } from 'react';

export default function FirstLoginAI({ user }) {
  useEffect(() => {
    if(user.isFirstLogin){
      alert(`Welcome ${user.name}! Let's set up your profile.`);
      alert('Upload profile picture → Add connections → Check feed → Start live → Open store → Read platform rules');
    }
  }, [user]);

  return null; // purely AI text guidance
}
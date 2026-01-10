// frontend/src/pages/Signup.js
import React, { useState, useEffect } from 'react';
import AIHelper from '../components/AIHelper';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referral, setReferral] = useState('');

  useEffect(() => {
    console.log('Signup page mounted');
  }, []);

  const handleSignup = () => {
    console.log('Signing up', email, password, referral);
    // Add your API call here if needed
  };

  return (
    <div className="signup-page">
      {/* AI onboarding/helper component */}
      <AIHelper userId="currentUserId" role="user" />

      <h2>Sign Up</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Referral (optional)"
        value={referral}
        onChange={(e) => setReferral(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}
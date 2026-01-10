// frontend/src/pages/Login.js
import React, { useState, useEffect } from 'react';
import AIHelper from '../components/AIHelper';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Page mounted logic, can add tracking or initialization here
    console.log('Login page mounted');
  }, []);

  const handleLogin = async () => {
    // Call backend auth/login endpoint
    console.log('Logging in', email);
    // Example: add your fetch/post request here to authenticate
    // const res = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({email, password}) });
  };

  return (
    <div className="login-page">
      <h2>Login</h2>

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
      <button onClick={handleLogin}>Login</button>

      {/* AI onboarding/helper component */}
      <AIHelper userId="currentUserId" role="user" />
    </div>
  );
}
const handleLogin = async () => {
  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  try {
    // Example POST request to your backend
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    // If successful
    console.log("Login successful:", data);
    alert("Login successful!");

    // You can store token locally if needed
    // localStorage.setItem("authToken", data.token);

    // Redirect or update UI
    // window.location.href = "/dashboard"; // example redirect
  } catch (err) {
    console.error("Login error:", err);
    alert("An error occurred during login. Please try again.");
  }
};
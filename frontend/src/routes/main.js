// frontend/src/main.js

// Import React (optional if you just want global stuff)
import React from "react";
import ReactDOM from "react-dom/client";

// Import main App
import App from "./App";

// Import global styles
import "./style/global.css";

// Render the app to the root element
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: log to confirm main.js loaded
console.log("frontend main.js loaded, App initialized");
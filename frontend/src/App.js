import React from "react";

// Import components using correct relative paths and case-sensitive filenames
import Navbar from './ui-layout/Navbar';
import Footer from './layouts/Footer';

function App() {
  return (
    <div>
      <Navbar />
      {/* Your main app content goes here */}
      <Footer />
    </div>
  );
}

export default App;

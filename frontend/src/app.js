import React from "react";
import VideoCards from "./components/VideoCards";
import Footer from "./Footer";

function App() {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>My Video Gallery</h1>
      <VideoCards />
      <Footer />
    </>
  );
}

export default App;
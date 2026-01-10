import React from "react";

const footerStyle = {
  backgroundColor: "#222",
  color: "#fff",
  textAlign: "center",
  padding: "20px 0",
  position: "fixed",
  bottom: 0,
  width: "100%",
};

const socialIconsContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "15px",
  marginTop: "10px",
};

const iconWrapper = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  borderRadius: "10px",
  backgroundColor: "#fff",
  overflow: "hidden",
  cursor: "pointer",
};

// SVG logos with platform-specific colors
const icons = {
  youtube: (
    <svg viewBox="0 0 24 24" width="20" height="20">
      <path
        fill="#FF0000"
        d="M23.498 6.186c-.275-1.034-1.086-1.847-2.12-2.123C19.564 3.5 12 3.5 12 3.5s-7.563 0-9.378.563c-1.033.275-1.844 1.089-2.12 2.123C0 8 0 12 0 12s0 4 0.502 5.814c.276 1.034 1.087 1.848 2.12 2.123C4.437 20.5 12 20.5 12 20.5s7.563 0 9.378-.563c1.033-.275 1.845-1.089 2.12-2.123C24 16 24 12 24 12s0-4-0.502-5.814zM9.545 15.568v-7.136l6.182 3.568-6.182 3.568z"
      />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" width="20" height="20">
      <path
        fill="#1877F2"
        d="M22.675 0H1.326C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.326 24h11.495v-9.294H9.691V11.08h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.796.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.313h3.587l-.467 3.626h-3.12V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z"
      />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" width="20" height="20">
      <path
        fill="#1DA1F2"
        d="M24 4.557a9.833 9.833 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.864 9.864 0 0 1-3.127 1.195 4.918 4.918 0 0 0-8.384 4.482A13.944 13.944 0 0 1 1.671 3.149 4.918 4.918 0 0 0 3.195 9.722 4.897 4.897 0 0 1 .96 9.1v.062a4.918 4.918 0 0 0 3.946 4.827 4.902 4.902 0 0 1-2.212.084 4.919 4.919 0 0 0 4.588 3.417A9.867 9.867 0 0 1 0 21.543 13.933 13.933 0 0 0 7.548 24c9.142 0 14.307-7.721 13.995-14.646A9.936 9.936 0 0 0 24 4.557z"
      />
    </svg>
  ),
};

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>© 2026 PulsePlay. All rights reserved.</p>
      <div style={socialIconsContainer}>
        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...iconWrapper }}
        >
          {icons.youtube}
        </a>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...iconWrapper }}
        >
          {icons.facebook}
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...iconWrapper }}
        >
          {icons.twitter}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
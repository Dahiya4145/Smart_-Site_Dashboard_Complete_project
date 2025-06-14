import React, { useEffect, useState } from "react";
import "./Footer.css";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const [visitorCount, setVisitorCount] = useState(null);

  useEffect(() => {
    fetch("http://localhost:7700/server/visitors")
      .then((res) => res.json())
      .then((data) => setVisitorCount(data.count))
      .catch((err) => console.error("Visitor API Error:", err));
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="company-info">
          <h2>BuildSmart</h2>
          <p>
            We revolutionize construction monitoring by blending technology with real-time insights. 
            Building smarter, faster, and better.
          </p>
        </div>

        <div className="social-section">
          <h3 className="social-heading">Our Social Media</h3>
          <div className="social-links">
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedin className="icon" /> LinkedIn
            </a>
            <a href="https://github.com/Dahiya4145" target="_blank" rel="noreferrer">
              <FaGithub className="icon" /> GitHub
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter className="icon" /> Twitter
            </a>
          </div>
          <button className="visitor-btn">
            Visitor Count: {visitorCount !== null ? visitorCount : "Loading..."}
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} BuildSmart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

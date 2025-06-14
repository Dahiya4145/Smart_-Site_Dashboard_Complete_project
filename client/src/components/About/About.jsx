import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>About Our Company</h1>
      <p className="about-intro">
        We are committed to transforming the construction industry through smart, sustainable, and tech-driven solutions.
      </p>

      <div className="about-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to streamline construction site monitoring and management
          by leveraging innovative technologies. We aim to enhance transparency,
          boost productivity, and promote sustainable development across all our projects.
        </p>
      </div>

      <div className="about-section">
        <h2>Our Vision</h2>
        <p>
          To become a global leader in smart infrastructure management, empowering stakeholders with real-time insights and automated tools that redefine the future of construction.
        </p>
      </div>
    </div>
  );
};

export default About;

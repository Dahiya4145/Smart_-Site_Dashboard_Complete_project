import React, { useState } from "react";
import "./Contact.css";
import emailjs from "emailjs-com";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     emailjs
      .send(
        "service_b3rolrl", // replace
        "template_s9m60er", // replace
        formData,
        "WbeIcDbH1lh42Q4-T" // or public key
      )
      .then(
        (result) => {
          console.log(result.text);
          setSubmitted(true);
        },
        (error) => {
          console.error(error.text);
          alert("Failed to send message. Try again later.");
        }
      );
  };

  return (
    <div className="contact-container">
      <div className="contact-form">
        <h2>Contact Us</h2>
        {submitted ? (
          <div className="thank-you-message">
            <h3>Thank you for contacting us!</h3>
            <p>We will get back to you as soon as possible.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
      <div className="contact-info">
        <h3>Our Social Media</h3>
        <div className="social-icons">
          <a href="https://github.com/Dahiya4145" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"> GitHub</i>
          </a>
          
          <a href="https://www.linkedin.com/in/nishant-dahiya-080bb4259/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"> LinkedIn</i>
          </a>
          
        </div>
        <h3>Our Address</h3>
        <p>Sonipat, Haryana, India</p>
        <p>Email: project.2025nv@gmail.com</p>
        <p>Phone: +91-8053569123</p>
      </div>
    </div>
  );
};

export default Contact;

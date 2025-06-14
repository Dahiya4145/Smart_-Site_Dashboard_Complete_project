import React from "react";
import { motion } from "framer-motion";
import {
  FaTools,
  FaChartLine,
  FaHardHat,
  FaMapMarkedAlt,
  FaBolt,
  FaCloudSun
} from "react-icons/fa";
import "./Features.css"; // ✅ Import custom styles

const features = [
  {
    icon: <FaMapMarkedAlt className="text-blue-500 text-4xl feature-icon" />,
    title: "Multi-Site Dashboard",
    description:
      "Manage and monitor multiple construction sites in one centralized dashboard with real-time insights and quick switching between projects."
  },
  {
    icon: <FaCloudSun className="text-yellow-500 text-4xl feature-icon" />,
    title: "Live Weather Updates",
    description:
      "Stay informed with real-time weather data for each site, powered by OpenWeatherMap and socket.io for instant updates."
  },
  {
    icon: <FaHardHat className="text-red-400 text-4xl feature-icon" />,
    title: "Labor Tracking",
    description:
      "Monitor labor attendance, roles, and site assignments. Ensure optimal workforce distribution and productivity."
  },
  {
    icon: <FaTools className="text-green-500 text-4xl feature-icon" />,
    title: "Material Management",
    description:
      "Track construction materials, quantities, usage, and delivery logs to reduce wastage and improve site efficiency."
  },
  {
    icon: <FaChartLine className="text-purple-500 text-4xl feature-icon" />,
    title: "Task Scheduling",
    description:
      "Assign and monitor project tasks with timelines, due dates, and status indicators to avoid delays and ensure accountability."
  },
  {
    icon: <FaBolt className="text-orange-500 text-4xl feature-icon" />,
    title: "Real-Time Notifications",
    description:
      "Receive instant alerts and notifications for critical updates, weather changes, and task assignments."
  }
];

const Features = () => {
  return (
    <div className="features-container">
  <motion.h1
    initial={{ y: -30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6 }}
    className="features-title"
  >
    Platform Features
  </motion.h1>

  {features.map((feature, index) => (
    <motion.div
      key={index}
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="feature-section"
    >
      <div className="feature-header">
        {feature.icon}
        <h2 className="feature-title">{feature.title}</h2>
      </div>
      <p className="feature-description">{feature.description}</p>
    </motion.div>
  ))}
</div>

  );
};

export default Features;

import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import { FaMapMarkerAlt, FaWind } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import About from "../About/About";
import io from "socket.io-client";

const socket = io("http://localhost:7700"); // Replace with actual server URL if deployed

const Home = () => {
  const [sites, setSites] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const aboutRef = useRef(null);

  useEffect(() => {
    if (location.pathname === "/about" && aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  useEffect(() => {
    const fetchSitesWithWeather = async () => {
      try {
        const sitesRes = await fetch("http://localhost:7700/server/sites");
        const sitesData = await sitesRes.json();

        const sitesWithWeather = await Promise.all(
          sitesData.map(async (site) => {
            const weatherRes = await fetch(
              `http://localhost:7700/server/sites/${site._id}/weather`
            );
            const weatherJson = await weatherRes.json();
            return { ...site, weather: weatherJson.weather };
          })
        );

        setSites(sitesWithWeather);
      } catch (err) {
        console.error("Error fetching sites or weather data", err);
      }
    };

    fetchSitesWithWeather();
  }, []);

  useEffect(() => {
    // 🔄 Listen for real-time weather updates
    socket.on("weatherUpdate", (data) => {
      setSites((prevSites) =>
        prevSites.map((site) =>
          site._id === data.siteId
            ? { ...site, weather: parseWeather(data.weather) }
            : site
        )
      );
    });

    return () => {
      socket.off("weatherUpdate"); // Clean up on unmount
    };
  }, []);

  const parseWeather = (apiData) => {
    return {
      condition: apiData.current.condition.text,
      temperature: apiData.current.temp_c,
      windSpeed: apiData.current.wind_kph,
      icon: apiData.current.condition.icon?.split("/").pop().replace(".png", ""), // Extract icon code
    };
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "green";
      case "active":
        return "orange";
      case "paused":
        return "red";
      default:
        return "blue";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const calculateDaysLeft = (endDate) => {
    const today = new Date();
    const deadline = new Date(endDate);
    const timeDiff = deadline - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysLeft;
  };

  return (
    <div className="home">
      <header className="home-banner">
        <h1>Welcome to BuildSmart Dashboard</h1>
        <p>Monitor and manage your construction sites efficiently</p>
      </header>

      <div className="site-card-container">
        {sites.map((site, index) => (
          <motion.div
            key={site._id}
            className="site-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate(`/sites/${site._id}`)}
            style={{ cursor: "pointer" }}
          >
            <h2>{site.name}</h2>
            <p className="location">
              <FaMapMarkerAlt /> {site.location}
            </p>
            <span
              className="status-btn"
              style={{ backgroundColor: getStatusColor(site.status) }}
            >
              {site.status}
            </span>

            <p><strong>Starting Date:</strong> {formatDate(site.startDate)}</p>
            <p>
              <strong>Project Deadline:</strong> {formatDate(site.endDate)} 
              <br />
              <strong>Days Left:</strong> {calculateDaysLeft(site.endDate)} days
            </p>

            {site.weather ? (
              <div className="weather-section">
                <img
                  src={`http://openweathermap.org/img/wn/${site.weather.icon}@2x.png`}
                  alt={site.weather.condition}
                  title={`Condition: ${site.weather.condition}\nTemperature: ${site.weather.temperature}°C\nWind: ${site.weather.windSpeed} kph`}
                  className="weather-icon"
                />
                <p>{site.weather.condition}</p>
                <p className="temperature-row">
                  <img
                    src="/assets/icons/thermometer.png"
                    alt="Temperature Icon"
                    className="temp-icon"
                  />
                  <span>{site.weather.temperature}°C</span>
                </p>
                <p>
                  <FaWind /> {site.weather.windSpeed} mph
                </p>
              </div>
            ) : (
              <p>Loading weather...</p>
            )}
          </motion.div>
        ))}
      </div>

      {/* ✅ About Section at the bottom of Home */}
      <section ref={aboutRef}>
        <About />
      </section>
    </div>
  );
};

export default Home;

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";                  // For creating the HTTP server
import { Server } from "socket.io";       // Socket.IO for real-time communication
import axios from "axios";                // For making HTTP requests to Weather API

// 🛠 Import route files
import authRoutes from "./routes/auth.js";
import siteRoutes from "./routes/sites.js";
import laborRoutes from "./routes/labor.js";
import materialRoutes from "./routes/material.js";
import taskRoutes from "./routes/tasks.js";
import Site from "./models/Site.js";      // Site model for fetching latitude & longitude
import visitorCounterRoute from "./routes/visitorCounter.js";
import userRoute from "./routes/user.js";
import notificationRoutes from "./routes/notification.js";  // <-- Added notification routes

const app = express();
dotenv.config();

// 🔌 Create HTTP server & bind it with Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",                         // Allow all origins for testing
    methods: ["GET", "POST"]
  }
});

// ⛓ MongoDB connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB.");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);                    // Exit if connection fails
  }
};

// 🔄 Mongo disconnect listener
mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected!");
});

// 🔐 Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// 🧩 API Routes
app.use("/server/auth", authRoutes);           // Login & Register
app.use("/server/sites", siteRoutes);          // Site CRUD operations
app.use("/server/labor", laborRoutes);         // Labor entries
app.use("/server/materials", materialRoutes);  // Materials tracking
app.use("/server/tasks", taskRoutes);          // Tasks & timelines
app.use("/server", visitorCounterRoute);       // Visitor counter
app.use("/server/users", userRoute);            // Users
app.use("/server/notifications", notificationRoutes);  // <-- Notification routes

// 🌦 Weather API Configuration
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// ⏱ Fetch and emit weather data for each site every 5 minutes
const fetchAndEmitWeather = async () => {
  try {
    const sites = await Site.find();   // Fetch all sites
    for (const site of sites) {
      if (site.latitude && site.longitude) {
        const url = `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${site.latitude},${site.longitude}&aqi=no`;
        const response = await axios.get(url);

        // Emit weather data to all connected clients with site reference
        io.emit("weatherUpdate", {
          siteId: site._id,
          siteName: site.name,
          weather: {
            condition: response.data.current.condition.text,
            icon: response.data.current.condition.icon,
            temperature: response.data.current.temp_c,
            windSpeed: response.data.current.wind_kph, // explicitly in KPH
            humidity: response.data.current.humidity
          }
        });

        console.log(`✅ Weather data emitted for site: ${site.name}`);
      }
    }
  } catch (err) {
    console.error("❌ Failed to fetch weather data:", err.message);
  }
};

// 📡 Poll weather data every 5 minutes (300000 ms)
setInterval(fetchAndEmitWeather, 5 * 60 * 1000);

// ⚡ Socket.IO Events
io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

// 🧯 Centralized error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  res.status(status).json({
    success: false,
    status,
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// 🚀 Start server
const PORT = process.env.PORT || 7700;
server.listen(PORT, () => {
  connect();
  console.log(`🚀 Server running on port ${PORT}`);
});

// Export io for use in controllers (e.g., to emit notifications)
export { io };

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./Dashboard.css";

export default function Dashboard({ theme = "light" }) {
  const [stats, setStats] = useState({ active: 0, paused: 0, completed: 0 });

  useEffect(() => {
    axios.get("http://localhost:7700/server/sites").then((res) => {
      const count = { active: 0, paused: 0, completed: 0 };
      res.data.forEach((site) => {
        if (count.hasOwnProperty(site.status)) count[site.status]++;
      });
      setStats(count);
    });
  }, []);

  return (
    <div className={`dashboard ${theme}-theme`}>
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="cards">
        {Object.entries(stats).map(([key, value], index) => (
          <motion.div
            key={key}
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h3>{key.charAt(0).toUpperCase() + key.slice(1)} Sites</h3>
            <p>{value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

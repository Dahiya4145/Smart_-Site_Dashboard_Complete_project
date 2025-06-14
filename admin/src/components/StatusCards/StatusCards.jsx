import "./StatusCards.css";
import { motion } from "framer-motion";

export default function StatusCards({ stats }) {
  const colors = {
    active: "#10b981",   // green-500
    pending: "#f59e0b",  // yellow-500
    progress: "#3b82f6", // blue-500
  };

  return (
    <div className="status-cards">
      {Object.entries(stats).map(([key, value], index) => (
        <motion.div
          key={key}
          className="status-card"
          style={{ borderColor: colors[key] }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
        >
          <h4>{key}</h4>
          <p>{value}</p>
        </motion.div>
      ))}
    </div>
  );
}

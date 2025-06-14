// App.js
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import Router from "./router";
import { BrowserRouter } from "react-router-dom";

import "./App.css";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setTheme(savedTheme);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar theme={theme} toggleTheme={toggleTheme} />
        <div className="main-content">
          <Navbar theme={theme} toggleTheme={toggleTheme} user={user} />
          <Router theme={theme} toggleTheme={toggleTheme} user={user} />
        </div>
      </div>
    </BrowserRouter>
  );
}

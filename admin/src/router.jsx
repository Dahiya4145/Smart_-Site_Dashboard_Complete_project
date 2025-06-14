import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Page Components
import Dashboard from "./pages/Dashboard/Dashboard";
import Sites from "./pages/Sites/Sites";
import Tasks from "./pages/Tasks/Tasks";
import Material from "./pages/Material/Material";
import LabourLog from "./pages/LabourLog/LabourLog";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Users from "./pages/Users/Users";
import Notification from "./pages/Notification/Notification";

// Inline PrivateRoute component to protect admin routes
function PrivateRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function Router({ theme }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Routes>
      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public Route */}
      <Route path="/login" element={<Login theme={theme} />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard theme={theme} />
          </PrivateRoute>
        }
      />
      <Route
        path="/sites"
        element={
          <PrivateRoute>
            <Sites theme={theme} />
          </PrivateRoute>
        }
      />
      <Route
        path="/tasks"
        element={
          <PrivateRoute>
            <Tasks theme={theme} />
          </PrivateRoute>
        }
      />
      <Route
        path="/material"
        element={
          <PrivateRoute>
            <Material theme={theme} />
          </PrivateRoute>
        }
      />
      <Route
        path="/labour"
        element={
          <PrivateRoute>
            <LabourLog theme={theme} />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile theme={theme} />
          </PrivateRoute>
        }
      />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <Users theme={theme} />
          </PrivateRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <PrivateRoute>
            <Notification theme={theme} userId={user?._id} />
          </PrivateRoute>
        }
      />

      {/* 404 Not Found */}
      <Route path="*" element={<h2>404 - Page Not Found</h2>} />
    </Routes>
  );
}

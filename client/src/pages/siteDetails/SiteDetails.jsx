import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SiteDetails.css";
import { FaMapMarkerAlt, FaWind } from "react-icons/fa";
import { MdOutlineThermostat } from "react-icons/md";
import { io } from "socket.io-client";
import { useAuth } from "../../context/AuthContext";
import EditModal from "../../components/EditModal/EditModal";
import { useNotifications } from "../../hooks/useNotifications"; // 👈 Import custom notification hook

// For production (deployed backend)
 const socket = io("http://localhost:7700");

// For local development
// const socket = io("http://localhost:7700");

const SiteDetails = () => {
  const { siteId } = useParams();
  const { user } = useAuth();
  const { addNotification } = useNotifications(); // 👈 Destructure notification function

  const [site, setSite] = useState(null);
  const [weather, setWeather] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [laborLogs, setLaborLogs] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [editType, setEditType] = useState("");
  const [showModal, setShowModal] = useState(false);

  const isEditor = user?.role === "admin" || user?.role === "engineer";
  const isAdmin = user?.role === "admin";

  const baseUrl = "http://localhost:7700/server";

  const openEdit = (item, type) => {
    setEditItem(item);
    setEditType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditItem(null);
    setEditType("");
    setShowModal(false);
  };

  const fetchMaterials = async () => {
    try {
      const res = await fetch(`${baseUrl}/materials/site/${siteId}`);
      const data = await res.json();
      setMaterials(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${baseUrl}/tasks/site/${siteId}`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLaborLogs = async () => {
    try {
      const res = await fetch(`${baseUrl}/labor/site/${siteId}`);
      const data = await res.json();
      setLaborLogs(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id, type) => {
    const confirmed = window.confirm(`Are you sure you want to delete this ${type}?`);
    if (!confirmed) return;

    let url = "";
    switch (type) {
      case "material":
        url = `${baseUrl}/materials/${id}`;
        break;
      case "task":
        url = `${baseUrl}/tasks/${id}`;
        break;
      case "labor":
        url = `${baseUrl}/labor/${id}`;
        break;
      default:
        return;
    }

    try {
      const res = await fetch(url, { method: "DELETE" });
      if (!res.ok) {
        const errData = await res.json();
        alert(`Failed to delete ${type}: ${errData.message || res.statusText}`);
        return;
      }
      if (type === "material") fetchMaterials();
      else if (type === "task") fetchTasks();
      else if (type === "labor") fetchLaborLogs();
    } catch (err) {
      console.error("Error deleting item:", err);
      alert("Failed to delete item.");
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [siteRes, weatherRes] = await Promise.all([
          fetch(`${baseUrl}/sites/${siteId}`),
          fetch(`${baseUrl}/sites/${siteId}/weather`)
        ]);
        const siteData = await siteRes.json();
        const weatherData = await weatherRes.json();

        setSite(siteData);
        setWeather(weatherData.weather);

        fetchMaterials();
        fetchTasks();
        fetchLaborLogs();
      } catch (err) {
        console.error("Error fetching site details:", err);
      }
    };

    fetchAllData();
  }, [siteId]);

  useEffect(() => {
    if (!socket || !siteId) return;

    socket.emit("joinSiteRoom", siteId);

    socket.on("weatherUpdate", (data) => {
      if (data.siteId === siteId) {
        setWeather(data.weather);
      }
    });

    return () => {
      socket.emit("leaveSiteRoom", siteId);
      socket.off("weatherUpdate");
    };
  }, [siteId]);

  if (!site) return <div className="site-details">Loading site details...</div>;



  const handleNotification = async ({ type: actionType, itemType, itemId, description }) => {
  try {
    await addNotification({
      action: actionType,
      entity: itemType,
      entityId: itemId,
      performedBy: user.username,
      role: user.role,
      description,
    });
  } catch (err) {
    console.error("Notification error:", err);
  }
};

  // 👉 Notification logic after save
  const handleSave = async (savedData, isNew, type) => {
  try {
    const action = isNew ? "add" : "edit";
    const label = type.charAt(0).toUpperCase() + type.slice(1);
    const entityId = savedData._id || "unknown_id";

    const description = `${user.username} ${action}ed a ${type}`;

    await handleNotification({ type: action, itemType: type, itemId: entityId, description });

    closeModal();

    fetchMaterials();
    fetchTasks();
    fetchLaborLogs();
  } catch (error) {
    console.error("Error in handleSave:", error);
  }
};




  return (
    <div className="site-details-container">
      <h1>{site.name}</h1>
      <div className="location-row">
        <strong>
          <p className="location">
            <FaMapMarkerAlt /> {site.location}
          </p>
        </strong>
        {site.latitude && site.longitude && (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${site.latitude},${site.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="open-map-button"
          >
            Open Map
          </a>
        )}
      </div>

      <p className="status">
        <strong>Status:</strong> {site.status}
      </p>

      {/* Weather Section */}
      <section className="section weather-section">
        <h2>Weather Info</h2>
        {weather ? (
          <div className="weather-info">
            <img
              src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.condition}
              className="weather-icon"
            />
            <p><MdOutlineThermostat /> {weather.temperature}°C</p>
            <p><FaWind /> {weather.windSpeed} mph</p>
            <p><strong>Condition:</strong> {weather.condition}</p>
            <p><strong>Humidity:</strong> {weather.humidity}%</p>
          </div>
        ) : (
          <p>Loading weather info...</p>
        )}
      </section>

      {/* Materials Section */}
      <section className="section material-section">
        <h2>Materials Info</h2>
        {isEditor && (
          <button className="add-button" onClick={() => openEdit({}, "material")}>
            + Add New Material
          </button>
        )}
        {materials.length > 0 ? (
          <div className="materials-list">
            {materials.map((mat) => (
              <div className="material-card" key={mat._id}>
                <p><strong>Material Name:</strong> {mat.materialName}</p>
                <p><strong>Quantity:</strong> {mat.quantity}</p>
                <p><strong>Unit:</strong> {mat.unit}</p>
                <p><strong>Remarks:</strong> {mat.remarks || "N/A"}</p>
                <p><strong>Received Date:</strong> {new Date(mat.receivedDate).toLocaleDateString()}</p>
                {isAdmin && (
                  <>
                    <button className="edit-button" onClick={() => openEdit(mat, "material")}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(mat._id, "material")}>Delete</button>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No materials found for this site.</p>
        )}
      </section>

      {/* Tasks Section */}
      <section className="section task-section">
        <h2>Tasks Info</h2>
        {isEditor && (
          <button className="add-button" onClick={() => openEdit({}, "task")}>
            + Add New Task
          </button>
        )}
        {tasks.length > 0 ? (
          <div className="tasks-list">
            {tasks.map((task) => (
              <div className="task-card" key={task._id}>
                <p><strong>Title:</strong> {task.title}</p>
                <p><strong>Description:</strong> {task.description}</p>
                <p><strong>Status:</strong> {task.status}</p>
                <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
                {isEditor && (
                  <>
                    <button className="edit-button" onClick={() => openEdit(task, "task")}>Edit</button>
                    {isAdmin && (
                      <button className="delete-button" onClick={() => handleDelete(task._id, "task")}>Delete</button>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No tasks found for this site.</p>
        )}
      </section>

      {/* Labor Section */}
      <section className="section labor-section">
        <h2>Labor Info</h2>
        {isEditor && (
          <button className="add-button" onClick={() => openEdit({}, "labor")}>
            + Add New Labor Log
          </button>
        )}
        {laborLogs.length > 0 ? (
          <div className="labor-list">
            {laborLogs.map((log) => (
              <div className="labor-card" key={log._id}>
                <p><strong>Date:</strong> {new Date(log.date).toLocaleDateString()}</p>
                <p><strong>Number of Workers:</strong> {log.numberOfWorkers}</p>
                <p><strong>Supervisor Name:</strong> {log.supervisorName}</p>
                <p><strong>Supervisor Contact:</strong> {log.supervisorContact}</p>
                <p><strong>Notes:</strong> {log.notes || "N/A"}</p>
                {isAdmin && (
                  <>
                    <button className="edit-button" onClick={() => openEdit(log, "labor")}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(log._id, "labor")}>Delete</button>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No labor logs found for this site.</p>
        )}
      </section>

      {/* Edit Modal */}
      {showModal && (
  <EditModal
    data={editItem}
    type={editType}
    siteId={siteId}
    userRole={user?.role}
    isNew={!editItem || Object.keys(editItem).length === 0}
    onClose={closeModal}
    onSave={(savedData, isNew) => handleSave(savedData, isNew, editType)}
    handleNotification={handleNotification}
    refreshData={() => {
      fetchMaterials();
      fetchTasks();
      fetchLaborLogs();
    }}
  />
)}
    </div>
  );
};

export default SiteDetails;

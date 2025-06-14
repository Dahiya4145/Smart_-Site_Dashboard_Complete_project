import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditModal.css";

const EditModal = ({
  type,
  data,
  onClose,
  onSave,
  userRole,
  refreshData,
  siteId,
  handleNotification, // ✅ NEW
}) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(data || {});
  }, [data]);

  const isAdmin = userRole === "admin";
  const isEditMode = !!formData._id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderFields = () => {
    switch (type) {
      case "task":
        return (
          <>
            {(isAdmin || !isEditMode) && (
              <>
                <label>Title</label>
                <input name="title" value={formData.title || ""} onChange={handleChange} />
                <label>Description</label>
                <textarea name="description" value={formData.description || ""} onChange={handleChange} />
              </>
            )}

            {(isAdmin || isEditMode) && (
              <>
                <label>Status</label>
                <select name="status" value={formData.status || ""} onChange={handleChange}>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </>
            )}

            {(isAdmin || !isEditMode) && (
              <>
                <label>Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate?.split("T")[0] || ""}
                  onChange={handleChange}
                />
              </>
            )}
          </>
        );

      case "material":
        return (
          <>
            <label>Material Name</label>
            <input name="materialName" value={formData.materialName || ""} onChange={handleChange} />
            <label>Quantity</label>
            <input type="number" name="quantity" value={formData.quantity || ""} onChange={handleChange} />
            <label>Unit</label>
            <input name="unit" value={formData.unit || ""} onChange={handleChange} />
            <label>Remarks</label>
            <textarea name="remarks" value={formData.remarks || ""} onChange={handleChange} />
            <label>Received Date</label>
            <input
              type="date"
              name="receivedDate"
              value={formData.receivedDate?.split("T")[0] || ""}
              onChange={handleChange}
            />
          </>
        );

      case "labor":
        return (
          <>
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date?.split("T")[0] || ""}
              onChange={handleChange}
            />
            <label>Number of Workers</label>
            <input
              type="number"
              name="numberOfWorkers"
              value={formData.numberOfWorkers || ""}
              onChange={handleChange}
            />
            <label>Supervisor Name</label>
            <input
              name="supervisorName"
              value={formData.supervisorName || ""}
              onChange={handleChange}
            />
            <label>Supervisor Contact</label>
            <input
              name="supervisorContact"
              value={formData.supervisorContact || ""}
              onChange={handleChange}
            />
            <label>Notes</label>
            <textarea name="notes" value={formData.notes || ""} onChange={handleChange} />
          </>
        );

      default:
        return null;
    }
  };

  const getEndpoint = () => {
    if (isEditMode) {
      switch (type) {
        case "task":
          return `http://localhost:7700/server/tasks/${formData._id}`;
        case "material":
          return `http://localhost:7700/server/materials/${formData._id}`;
        case "labor":
          return `http://localhost:7700/server/labor/${formData._id}`;
        default:
          return "";
      }
    } else {
      switch (type) {
        case "task":
          return `http://localhost:7700/server/tasks/site/${siteId}`;
        case "material":
          return `http://localhost:7700/server/materials/site/${siteId}`;
        case "labor":
          return `http://localhost:7700/server/labor/site/${siteId}`;
        default:
          return "";
      }
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const endpoint = getEndpoint();

  if (!endpoint) {
    toast.error("Invalid endpoint.");
    return;
  }

  try {
    let savedData;

    if (isEditMode) {
      await axios.put(endpoint, formData);
      savedData = formData; // updated data
      toast.success(`${type} updated successfully!`);
    } else {
      const res = await axios.post(endpoint, formData);
      savedData = res.data;
      toast.success(`${type} added successfully!`);
    }

    onClose();
    if (refreshData) refreshData();
    if (onSave) onSave(savedData, !isEditMode); // Pass savedData to parent for notification and refresh

  } catch (err) {
    console.error("Submit error:", err);
    toast.error(err.response?.data?.message || "Operation failed.");
  }
};


  return (
    <div className="modal-overlay">
      <div className="edit-modal">
        <h3>{isEditMode ? `Edit` : `Add`} {type.charAt(0).toUpperCase() + type.slice(1)}</h3>
        <form onSubmit={handleSubmit}>
          {renderFields()}
          <div className="modal-buttons">
            <button type="submit" className="save-btn">{isEditMode ? "Save" : "Add"}</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;

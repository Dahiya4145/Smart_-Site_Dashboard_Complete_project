import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "../../components/DataTable/DataTable";
import EditModal from "../../components/EditModal/EditModal";
import exportToPDF from "../../utils/exportToPDF";
import exportToExcel from "../../utils/exportToExcel";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./LabourLog.css";

export default function LabourLog({ theme }) {
  const [logs, setLogs] = useState([]);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await axios.get("http://localhost:7700/server/labor");
      setLogs(res.data);
    } catch (err) {
      toast.error("Error fetching labour logs");
      console.error("Error fetching labour logs:", err);
    }
  };

  const handleEdit = (log) => {
    setEditItem(log);
  };

  const handleAddNew = () => {
    setEditItem({
      siteId: "",
      numberOfWorkers: "",
      supervisorName: "",
      supervisorContact: "",
      notes: "",
    });
  };

  const handleUpdate = async (updated) => {
    try {
      await axios.put(`http://localhost:7700/server/labor/${updated._id}`, updated);
      toast.success("Labour log updated successfully!");
      fetchLogs();
      setEditItem(null);
    } catch (err) {
      toast.error("Failed to update labour log");
      console.error("Error updating labour log:", err);
    }
  };

  const handleAddSubmit = async (newLog) => {
    if (!newLog.siteId) {
      toast.error("Site ID is required");
      return;
    }

    try {
      await axios.post(`http://localhost:7700/server/labor/site/${newLog.siteId}`, newLog);
      toast.success("Labour log added successfully!");
      fetchLogs();
      setEditItem(null);
    } catch (err) {
      toast.error("Failed to add labour log");
      console.error("Error adding labour log:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this labour log?")) return;

    try {
      await axios.delete(`http://localhost:7700/server/labor/${id}`);
      toast.success("Labour log deleted successfully!");
      fetchLogs();
    } catch (err) {
      toast.error("Failed to delete labour log");
      console.error("Error deleting labour log:", err);
    }
  };

  const tableColumns = [
    { label: "Site ID", accessor: "siteId" },
    { label: "No. of Workers", accessor: "numberOfWorkers" },
    { label: "Supervisor", accessor: "supervisorName" },
    { label: "Supervisor Contact", accessor: "supervisorContact" },
    { label: "Notes", accessor: "notes" },
  ];

  const modalColumns = [
    { label: "Site ID", accessor: "siteId" },
    { label: "No. of Workers", accessor: "numberOfWorkers" },
    { label: "Supervisor", accessor: "supervisorName" },
    { label: "Supervisor Contact", accessor: "supervisorContact" },
    { label: "Notes", accessor: "notes" },
  ];

  return (
  <div className={`labour-page ${theme}-theme`}>
    <ToastContainer position="top-right" autoClose={3000} />

    <div className="labour-header">
      <h2>Labour Logs</h2>
      <div>
        <button className="btn" onClick={handleAddNew}>
          Add New
        </button>
        <button
          className="btn btn-export"
          onClick={() => exportToPDF(logs, tableColumns, "Labour Logs")}
        >
          Export PDF
        </button>
        <button
          className="btn btn-excel"
          onClick={() => exportToExcel(logs, tableColumns, "Labour Logs")}
        >
          Export Excel
        </button>
      </div>
    </div>

    {logs.length === 0 ? (
      <div className="no-notifications-container">
        <svg
          className="no-notifications-icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="64"
          height="64"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17v-2a4 4 0 10-8 0v2m5 4h4a4 4 0 004-4v-3a4 4 0 00-4-4h-1.5M12 3v4M7 21h10"
          />
        </svg>
        <h3>No Labour Logs</h3>
        <p>You’re all caught up! No labour logs available at the moment.</p>
      </div>
    ) : (
      <DataTable columns={tableColumns} data={logs} onEdit={handleEdit} onDelete={handleDelete} />
    )}

    {editItem && (
      <EditModal
        visible={!!editItem}
        item={editItem}
        onClose={() => setEditItem(null)}
        onSubmit={editItem._id ? handleUpdate : handleAddSubmit}
        columns={modalColumns}
      />
    )}
  </div>
);

}

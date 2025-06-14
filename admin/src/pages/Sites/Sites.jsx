import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "../../components/DataTable/DataTable";
import EditModal from "../../components/EditModal/EditModal";
import exportToPDF from "../../utils/exportToPDF";
import exportToExcel from "../../utils/exportToExcel";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import "../../components/Notification/Notification.css"; // for empty state styles
import "./Sites.css";

export default function Sites({ theme }) {
  const [sites, setSites] = useState([]);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const res = await axios.get("http://localhost:7700/server/sites");
      setSites(res.data);
    } catch (err) {
      toast.error("Error fetching sites");
      console.error("Error fetching sites:", err);
    }
  };

  const handleEdit = (site) => {
    setEditItem(site);
  };

  const handleAddNew = () => {
    setEditItem({ name: "", location: "", status: "Pending" });
  };

  const handleUpdate = async (updatedSite) => {
    try {
      await axios.put(`http://localhost:7700/server/sites/${updatedSite._id}`, updatedSite);
      toast.success("Site updated successfully!");
      fetchSites();
      setEditItem(null);
    } catch (err) {
      toast.error("Failed to update site");
      console.error("Error updating site:", err);
    }
  };

  const handleAddSubmit = async (newSite) => {
    try {
      await axios.post("http://localhost:7700/server/sites", newSite);
      toast.success("Site added successfully!");
      fetchSites();
      setEditItem(null);
    } catch (err) {
      toast.error("Failed to add site");
      console.error("Error adding site:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this site?")) return;

    try {
      await axios.delete(`http://localhost:7700/server/sites/${id}`);
      toast.success("Site deleted successfully!");
      fetchSites();
    } catch (err) {
      toast.error("Failed to delete site");
      console.error("Error deleting site:", err);
    }
  };

  const tableColumns = [
    { label: "Site ID", accessor: "_id" },
    { label: "Name", accessor: "name" },
    { label: "Location", accessor: "location" },
    { label: "Status", accessor: "status" },
  ];

  const modalColumns = [
    { label: "Name", accessor: "name" },
    { label: "Location", accessor: "location" },
    { label: "Status", accessor: "status" },
  ];

  return (
    <div className={`sites-page ${theme}-theme`}>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="sites-header">
        <h2>All Sites</h2>
        <div>
          <button className="btn" onClick={handleAddNew}>Add New</button>
          <button
            className="btn btn-export"
            onClick={() => exportToPDF(sites, tableColumns, "Sites Report")}
          >
            Export PDF
          </button>
          <button
            className="btn btn-excel"
            onClick={() => exportToExcel(sites, tableColumns, "Sites Report")}
          >
            Export Excel
          </button>
        </div>
      </div>

      {sites.length === 0 ? (
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
          <h3>No Sites</h3>
          <p>There are no sites available at the moment.</p>
        </div>
      ) : (
        <DataTable columns={tableColumns} data={sites} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <EditModal
        visible={!!editItem}
        item={editItem}
        onClose={() => setEditItem(null)}
        onSubmit={editItem?._id ? handleUpdate : handleAddSubmit}
        columns={modalColumns}
      />
    </div>
  );
}

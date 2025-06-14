import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "../../components/DataTable/DataTable";
import EditModal from "../../components/EditModal/EditModal";
import exportToPDF from "../../utils/exportToPDF";
import exportToExcel from "../../utils/exportToExcel";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Material.css";

export default function Material({ theme }) {
  const [materials, setMaterials] = useState([]);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const res = await axios.get("http://localhost:7700/server/materials");
      setMaterials(res.data);
    } catch (err) {
      toast.error("Error fetching materials");
      console.error("Error fetching materials:", err);
    }
  };

  const handleEdit = (material) => {
    setEditItem(material);
  };

  const handleAddNew = () => {
    setEditItem({ siteId: "", materialName: "", quantity: "", unit: "", remarks: "" });
  };

  const handleUpdate = async (updated) => {
    try {
      await axios.put(`http://localhost:7700/server/materials/${updated._id}`, updated);
      toast.success("Material updated successfully!");
      fetchMaterials();
      setEditItem(null);
    } catch (err) {
      toast.error("Failed to update material");
      console.error("Error updating material:", err);
    }
  };

  const handleAddSubmit = async (newMaterial) => {
    if (!newMaterial.siteId) {
      toast.error("Site ID is required");
      return;
    }

    try {
      await axios.post(`http://localhost:7700/server/materials/site/${newMaterial.siteId}`, newMaterial);
      toast.success("Material added successfully!");
      fetchMaterials();
      setEditItem(null);
    } catch (err) {
      toast.error("Failed to add material");
      console.error("Error adding material:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this material?")) return;

    try {
      await axios.delete(`http://localhost:7700/server/materials/${id}`);
      toast.success("Material deleted successfully!");
      fetchMaterials();
    } catch (err) {
      toast.error("Failed to delete material");
      console.error("Error deleting material:", err);
    }
  };

  const tableColumns = [
    { label: "Site ID", accessor: "siteId" },
    { label: "Material Name", accessor: "materialName" },
    { label: "Quantity", accessor: "quantity" },
    { label: "Unit", accessor: "unit" },
    { label: "Remarks", accessor: "remarks" },
  ];

  const modalColumns = [
    { label: "Site ID", accessor: "siteId" },
    { label: "Material Name", accessor: "materialName" },
    { label: "Quantity", accessor: "quantity" },
    { label: "Unit", accessor: "unit" },
    { label: "Remarks", accessor: "remarks" },
  ];

   return (
    <div className={`material-page ${theme}-theme`}>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="material-header">
        <h2>All Materials</h2>
        <div>
          <button className="btn" onClick={handleAddNew}>
            Add New
          </button>
          <button
            className="btn btn-export"
            onClick={() => exportToPDF(materials, tableColumns, "Materials Report")}
          >
            Export PDF
          </button>
          <button
            className="btn btn-excel"
            onClick={() => exportToExcel(materials, tableColumns, "Materials Report")}
          >
            Export Excel
          </button>
        </div>
      </div>

      {materials.length === 0 ? (
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
          <h3>No Materials</h3>
          <p>You’re all caught up! No materials available at the moment.</p>
        </div>
      ) : (
        <DataTable columns={tableColumns} data={materials} onEdit={handleEdit} onDelete={handleDelete} />
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

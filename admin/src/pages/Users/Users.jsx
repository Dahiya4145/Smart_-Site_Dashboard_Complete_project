import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "../../components/DataTable/DataTable";
import EditModal from "../../components/EditModal/EditModal";
import exportToPDF from "../../utils/exportToPDF";
import exportToExcel from "../../utils/exportToExcel";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import "../../components/Notification/Notification.css"; // For empty state styles
import "./UserList.css";

export default function UserList({ theme }) {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:7700/server/users");
      setUsers(res.data);
    } catch (err) {
      toast.error("Error fetching users");
      console.error("Error fetching users:", err);
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleUpdate = async (updatedUser) => {
    try {
      await axios.put(`http://localhost:7700/server/users/${updatedUser._id}`, updatedUser);
      toast.success("User updated successfully!");
      fetchUsers();
      setEditUser(null);
    } catch (err) {
      toast.error("Failed to update user");
      console.error("Error updating user:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:7700/server/users/${id}`);
      toast.success("User deleted successfully!");
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Failed to delete user: " + (err.response?.data?.message || err.message));
    }
  };

  const handleAddNew = () => {
    setEditUser({ username: "", email: "", role: "", password: "" });
  };

  const handleAddSubmit = async (newUser) => {
    try {
      await axios.post("http://localhost:7700/server/auth/register", newUser);
      toast.success("User added successfully!");
      fetchUsers();
      setEditUser(null);
    } catch (err) {
      toast.error("Failed to add user");
      console.error("Error adding user:", err);
    }
  };

  const tableColumns = [
    { label: "Username", accessor: "username" },
    { label: "Email", accessor: "email" },
    { label: "Role", accessor: "role" },
    { label: "Created At", accessor: "createdAt" },
  ];

  const modalColumns = [
    { label: "Username", accessor: "username" },
    { label: "Email", accessor: "email" },
    { label: "Role", accessor: "role" },
    { label: "Password", accessor: "password" },
  ];

  return (
    <div className={`user-page ${theme}-theme`}>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="user-header">
        <h2>All Users</h2>
        <div>
          <button className="btn" onClick={handleAddNew}>
            Add New
          </button>
          <button
            className="btn btn-export"
            onClick={() => exportToPDF(users, tableColumns, "Users Report")}
          >
            Export PDF
          </button>
          <button
            className="btn btn-excel"
            onClick={() => exportToExcel(users, tableColumns, "Users Report")}
          >
            Export Excel
          </button>
        </div>
      </div>

      {users.length === 0 ? (
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
          <h3>No Users</h3>
          <p>There are no users available at the moment.</p>
        </div>
      ) : (
        <DataTable columns={tableColumns} data={users} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <EditModal
        visible={!!editUser}
        item={editUser}
        onClose={() => setEditUser(null)}
        onSubmit={editUser?._id ? handleUpdate : handleAddSubmit}
        columns={modalColumns}
      />
    </div>
  );
}

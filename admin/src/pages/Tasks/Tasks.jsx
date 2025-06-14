import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "../../components/DataTable/DataTable";
import EditModal from "../../components/EditModal/EditModal";
import exportToPDF from "../../utils/exportToPDF";
import exportToExcel from "../../utils/exportToExcel";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Tasks.css";

export default function Tasks({ theme }) {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  // Get current user info from localStorage (adjust based on your auth)
  const currentUser = JSON.parse(localStorage.getItem("user")) || {
    username: "unknown",
    role: "guest",
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:7700/server/tasks");
      setTasks(res.data);
    } catch (err) {
      toast.error("Error fetching tasks");
      console.error("Error fetching tasks:", err);
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
  };

  const handleAddNew = () => {
    setEditTask({
      siteId: "",
      title: "",
      description: "",
      dueDate: "",
      status: "pending",
    });
  };

  const sendNotification = async (notification) => {
    try {
      await axios.post("http://localhost:7700/server/notifications", notification);
    } catch (err) {
      console.error("Failed to send notification:", err);
    }
  };

  const handleUpdate = async (updatedTask) => {
    try {
      await axios.put(`http://localhost:7700/server/tasks/${updatedTask._id}`, updatedTask);
      toast.success("Task updated successfully!");

      // Send notification after successful update
      await sendNotification({
        action: "edit",
        entity: "task",
        entityId: updatedTask._id,
        performedBy: currentUser.username,
        role: currentUser.role,
        description: `${currentUser.role} ${currentUser.username} edited a task`,
      });

      fetchTasks();
      setEditTask(null);
    } catch (err) {
      toast.error("Failed to update task");
      console.error("Error updating task:", err);
    }
  };

  const handleAddSubmit = async (newTask) => {
    try {
      if (!newTask.siteId) {
        toast.error("Site ID is required to add a task.");
        return;
      }

      const res = await axios.post(`http://localhost:7700/server/tasks/site/${newTask.siteId}`, newTask);
      toast.success("Task added successfully!");

      // Send notification after successful add
      await sendNotification({
        action: "add",
        entity: "task",
        entityId: res.data._id,
        performedBy: currentUser.username,
        role: currentUser.role,
        description: `${currentUser.role} ${currentUser.username} added a new task`,
      });

      fetchTasks();
      setEditTask(null);
    } catch (err) {
      toast.error("Failed to add task");
      console.error("Error adding task:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`http://localhost:7700/server/tasks/${id}`);
      toast.success("Task deleted successfully!");

      // Send notification after successful delete
      await sendNotification({
        action: "delete",
        entity: "task",
        entityId: id,
        performedBy: currentUser.username,
        role: currentUser.role,
        description: `${currentUser.role} ${currentUser.username} deleted a task`,
      });

      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
      toast.error("Failed to delete task: " + (err.response?.data?.message || err.message));
    }
  };

  const tableColumns = [
    { label: "Site ID", accessor: "siteId" },
    { label: "Title", accessor: "title" },
    { label: "Description", accessor: "description" },
    { label: "Due Date", accessor: "dueDate" },
    { label: "Status", accessor: "status" },
  ];

  const modalColumns = [
    { label: "Site ID", accessor: "siteId" },
    { label: "Title", accessor: "title" },
    { label: "Description", accessor: "description" },
    { label: "Due Date", accessor: "dueDate" },
    { label: "Status", accessor: "status" },
  ];

  return (
  <div className={`tasks-page ${theme}-theme`}>
    <ToastContainer position="top-right" autoClose={3000} />

    <div className="tasks-header">
      <h2>All Tasks</h2>
      <div>
        <button className="btn" onClick={handleAddNew}>
          Add New
        </button>
        <button
          className="btn btn-export"
          onClick={() => exportToPDF(tasks, tableColumns, "Tasks Report")}
        >
          Export PDF
        </button>
        <button
          className="btn btn-excel"
          onClick={() => exportToExcel(tasks, tableColumns, "Tasks Report")}
        >
          Export Excel
        </button>
      </div>
    </div>

    {tasks.length === 0 ? (
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
        <h3>No Tasks</h3>
        <p>You’re all caught up! No tasks available at the moment.</p>
      </div>
    ) : (
      <DataTable columns={tableColumns} data={tasks} onEdit={handleEdit} onDelete={handleDelete} />
    )}

    <EditModal
      visible={!!editTask}
      item={editTask}
      onClose={() => setEditTask(null)}
      onSubmit={editTask?._id ? handleUpdate : handleAddSubmit}
      columns={modalColumns}
    />
  </div>
);

}

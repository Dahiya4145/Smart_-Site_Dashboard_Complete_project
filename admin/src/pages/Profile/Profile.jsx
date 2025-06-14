import { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

export default function Profile({ theme }) {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({ username: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setEditData({ username: parsedUser.username, email: parsedUser.email });
    }
  }, []);

  const handleSave = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await axios.put(`http://localhost:7700/server/users/${user._id}`, editData);
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      setShowModal(false);
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`profile-page ${theme}-theme`}>
      <div className="profile-container">
        <div className="profile-avatar">
          {user?.username?.[0]?.toUpperCase()}
        </div>
        <h2 className="profile-title">User Profile</h2>
        {user ? (
          <div className="profile-card">
            <div className="profile-field">
              <label>User ID</label>
              <span>{user._id}</span>
            </div>
            <div className="profile-field">
              <label>Username</label>
              <span>{user.username}</span>
            </div>
            <div className="profile-field">
              <label>Email</label>
              <span>{user.email}</span>
            </div>
            <div className="profile-field">
              <label>Role</label>
              <span>{user.role}</span>
            </div>
            <button
              className={`btn-edit ${theme}-theme`}
              onClick={() => setShowModal(true)}
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <p>No user is currently logged in.</p>
        )}
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className={`modal ${theme}-theme`}>
            <h3>Edit Profile</h3>

            {error && <p className="error-msg">{error}</p>}

            <label>Username</label>
            <input
              type="text"
              value={editData.username}
              onChange={(e) =>
                setEditData({ ...editData, username: e.target.value })
              }
            />

            <label>Email</label>
            <input
              type="email"
              value={editData.email}
              onChange={(e) =>
                setEditData({ ...editData, email: e.target.value })
              }
            />

            <div className="modal-actions">
              <button
                className={`btn-save ${theme}-theme`}
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                className={`btn-cancel ${theme}-theme`}
                onClick={() => setShowModal(false)}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

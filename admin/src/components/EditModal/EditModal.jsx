// src/components/EditModal/EditModal.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./EditModal.css";

export default function EditModal({ visible, onClose, item, columns, onSubmit }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(item || {});
  }, [item]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="modal"
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <h3 style={{ marginBottom: "1rem" }}>
              {item ? "Edit Item" : "Add New Item"}
            </h3>

            <form onSubmit={handleSubmit}>
              {columns.map((col) => (
                <div key={col.accessor} className="form-group">
                  <label htmlFor={col.accessor}>{col.label}</label>
                  <input
                    id={col.accessor}
                    name={col.accessor}
                    value={formData[col.accessor] || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}

              <div className="modal-actions">
                <button type="submit" className="submit-btn">Save</button>
                <button type="button" className="cancel-btn" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

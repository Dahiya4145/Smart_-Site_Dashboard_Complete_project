import React from "react";
import "./DataTable.css";

export default function DataTableDeleteOnly({ columns, data, onDelete }) {
  return (
    <table className="data-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.accessor || col.label}>{col.label}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx}>
            {columns.map((col) => (
              <td key={col.accessor || col.label}>{item[col.accessor]}</td>
            ))}
            <td>
              <button onClick={() => onDelete(item._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

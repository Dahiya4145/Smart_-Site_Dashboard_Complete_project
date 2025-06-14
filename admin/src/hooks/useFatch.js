import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(url).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, [url]);

  return { data, loading };
}

// src/utils/exportToPDF.js
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function exportToPDF(data, columns, title) {
  const doc = new jsPDF();
  const rows = data.map((row) => columns.map((col) => row[col.accessor]));

  doc.text(title, 14, 16);
  doc.autoTable({
    startY: 20,
    head: [columns.map((col) => col.label)],
    body: rows,
  });

  doc.save(`${title}.pdf`);
}

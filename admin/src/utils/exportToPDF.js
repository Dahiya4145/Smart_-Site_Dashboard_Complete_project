import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function exportToPDF(data, columns, title = "Report") {
  const doc = new jsPDF();

  doc.text(title, 14, 16);

  const tableColumn = columns.map((col) => col.label);
  const tableRows = data.map((row) =>
    columns.map((col) => row[col.accessor] || "")
  );

  // Use autoTable as a function, passing the doc instance explicitly
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
  });

  doc.save(`${title}.pdf`);
}

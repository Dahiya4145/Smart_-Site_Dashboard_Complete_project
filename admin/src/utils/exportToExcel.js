// src/utils/exportToExcel.js
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function exportToExcel(data, columns, filename) {
  const exportData = data.map((row) => {
    const rowData = {};
    columns.forEach((col) => {
      rowData[col.label] = row[col.accessor];
    });
    return rowData;
  });

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const file = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(file, `${filename}.xlsx`);
}

import React, { useCallback } from "react";
import "./index.css";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { renameJSONKeys } from "../utlis";

function ExportButtons({ data= [], fileName = "export", columns = [] }) {

  const getData = useCallback(() => renameJSONKeys(data, columns), [data, columns]);

  // Helper: Convert data to worksheet and download as Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(getData());
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), `${fileName}.xlsx`);
  };

  // Helper: CSV/TSV export
  const exportCSV = () => {
    const csv = Papa.unparse(getData());
    saveAs(new Blob([csv], { type: "text/csv" }), `${fileName}.csv`);
  };

  const exportTSV = () => {
    const tsv = Papa.unparse(getData(), { delimiter: "\t" });
    saveAs(new Blob([tsv], { type: "text/tab-separated-values" }), `${fileName}.tsv`);
  };

  // Helper: PDF export (simple table)
  const exportPDF = () => {
  const data = getData();
  const headers = Object.keys(data[0] || {});

  // Check if any header is too long (customize threshold)
  const isWideHeader = headers.some(h => h.length > 10); // adjust threshold as needed

  const doc = new jsPDF({
    orientation: isWideHeader ? "landscape" : "portrait",
    unit: "pt",
    format: isWideHeader ? "a3" : "a4",
  });

  const rows = data.map(row => headers.map(h => row[h]));

  doc.autoTable({
    head: [headers],
    body: rows,
    styles: {
      fontSize: isWideHeader ? 12 : 14,
      cellWidth: 'wrap',
      textColor: '#000000',             // Black text for body
      // fillColor: '#fff',         // White background
      lineColor: [220, 220, 220],         // Light grey border
      lineWidth: 0.05,
    },
    headStyles: {
      fontSize: isWideHeader ? 10 : 12,
      halign: 'center',
      fillColor: "#1abd9c", 
      textColor: "#ffffff",
      lineWidth: 0,
    },
    margin: { top: 40 },
    startY: 40,
    tableWidth: 'auto',
  });

  doc.save(`${fileName}.pdf`);
};

  // Helper: XML export
  const exportXML = () => {
    const escapeXML = (str) =>
      String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");

    let xml = '<?xml version="1.0" encoding="UTF-8"?><rows>';
    data.forEach(row => {
      xml += "<row>";
      Object.entries(row).forEach(([key, value]) => {
        xml += `<${key}>${escapeXML(value)}</${key}>`;
      });
      xml += "</row>";
    });
    xml += "</rows>";
    saveAs(new Blob([xml], { type: "application/xml" }), `${fileName}.xml`);
  };

  return (
    <div className="flex flex-col list">
      <button onClick={exportExcel}>Export Excel</button>
      <button onClick={exportCSV}>Export CSV</button>
      <button onClick={exportTSV}>Export TSV</button>
      <button onClick={exportPDF}>Export PDF</button>
      <button onClick={exportXML}>Export XML</button>
    </div>
  );
}

export default ExportButtons;
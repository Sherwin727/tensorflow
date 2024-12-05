import React, { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";

function InputForm({ onDataLoad, maxStudents, setMaxStudents }) {
  const [data, setData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onload = () => {
      const rows = reader.result
        .split("\n")
        .map((row) => row.split(",").map((item) => item.trim())); // Trim whitespace
  
      const validRows = rows.filter((row) => row.length === 3); // Ensure exactly 3 columns
      if (validRows.length === 0) {
        alert("No valid data found in the uploaded file.");
        return;
      }
  
      setData(validRows);
      onDataLoad(validRows);
    };
  
    reader.readAsText(file);
  };
  

  return (
    <Form>
      <Form.Group>
        <Form.Label>Upload Historical Data</Form.Label>
        <Form.Control type="file" accept=".csv" onChange={handleFileUpload} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Max Students Per Section</Form.Label>
        <Form.Control
          type="number"
          value={maxStudents}
          onChange={(e) => setMaxStudents(e.target.value)}
        />
      </Form.Group>
    </Form>
  );
}

export default InputForm;

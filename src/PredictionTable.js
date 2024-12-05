import React from "react";
import { Table } from "react-bootstrap";

function PredictionTable({ predictions }) {
  return (
    <div>
      <h3>Prediction Results</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Predicted Enrollment</th>
            <th>Sections Needed</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((prediction, index) => (
            <tr key={index}>
              <td>{prediction.courseCode}</td>
              <td>{prediction.predictedEnrollment}</td>
              <td>{prediction.sectionsNeeded}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default PredictionTable;

import React, { useState } from "react";
import InputForm from "./InputForm";
import TrainModelButton from "./TrainModelButton";
import PredictionTable from "./PredictionTable";
import Visualization from "./Visualization";
import * as tf from "@tensorflow/tfjs";

function App() {
  const [data, setData] = useState([]);
  const [maxStudents, setMaxStudents] = useState(30);
  const [predictions, setPredictions] = useState([]);

  const handleDataLoad = (uploadedData) => {
    setData(uploadedData);
  };

  const trainModel = async () => {
    if (data.length === 0) {
      alert("Please upload data.");
      return;
    }

    const processedData = preprocessData(data);
    const { xs, ys } = processedData;

    const model = createModel();
    await model.fit(xs, ys, { epochs: 10 }); // Reduced epochs for speed
    const predictionResults = makePredictions(model, data, maxStudents);
    setPredictions(predictionResults);
  };

  return (
    <div className="container mt-4">
      <h1>Enrollment Predictor</h1>
      <InputForm onDataLoad={handleDataLoad} maxStudents={maxStudents} setMaxStudents={setMaxStudents} />
      <TrainModelButton trainModel={trainModel} />
      <PredictionTable predictions={predictions} />
      <Visualization predictions={predictions} />
    </div>
  );
}

const preprocessData = (data) => {
  const xs = [];
  const ys = [];

  data.forEach((row) => {
    const [semester, courseCode, enrollment] = row;

    // Ensure all fields are present and valid
    if (!semester || !courseCode || !enrollment) {
      console.error("Invalid data row:", row);
      return;
    }

    const semesterNumeric = parseInt(semester.replace("-", ""));
    const courseCodeHash = courseCode.toString().hashCode(); // Safely handle courseCode
    const enrollmentInt = parseInt(enrollment);

    if (isNaN(semesterNumeric) || isNaN(enrollmentInt)) {
      console.error("Invalid numeric values in row:", row);
      return;
    }

    xs.push([semesterNumeric, courseCodeHash]);
    ys.push(enrollmentInt);
  });

  return { xs: tf.tensor2d(xs), ys: tf.tensor1d(ys) };
};


const createModel = () => {
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 32, inputShape: [2], activation: "relu" }));
  model.add(tf.layers.dense({ units: 1 }));
  model.compile({ optimizer: "adam", loss: "meanSquaredError" });
  return model;
};

const makePredictions = (model, data, maxStudents) => {
  return data.map(([semester, courseCode]) => {
    const semesterNumeric = parseInt(semester.replace("-", ""));
    const prediction = model.predict(tf.tensor2d([[semesterNumeric, courseCode.hashCode()]])).dataSync()[0];
    return {
      courseCode,
      predictedEnrollment: Math.round(prediction),
      sectionsNeeded: Math.ceil(prediction / maxStudents),
    };
  });
};

String.prototype.hashCode = function () {
  if (typeof this !== "string") {
    console.error("hashCode called on non-string value:", this);
    return 0; // Default to 0 for invalid input
  }
  return Array.from(this).reduce(
    (hash, char) => Math.imul(31, hash) + char.charCodeAt(0),
    0
  );
};


export default App;

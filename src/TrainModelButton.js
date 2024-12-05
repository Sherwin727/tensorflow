import React from "react";
import { Button } from "react-bootstrap";

function TrainModelButton({ trainModel }) {
  return (
    <Button onClick={trainModel} className="my-3">
      Train Model
    </Button>
  );
}

export default TrainModelButton;

// CropLifeCycleDisplay.js
import React from "react";
import Card from "react-bootstrap/Card";
import styles from "./CropLifeCycleDisplay.module.css"; // Ensure you create and link a CSS module for styling

const CropLifeCycleDisplay = ({ cropData }) => {
  return (
    <Card border="secondary" style={{ width: "30rem" }}>
      <Card.Header className={styles.cropHeader}>
        Crop Life Cycle - {cropData.cropName}
      </Card.Header>
      <Card.Body>
        {cropData.lifeCycle.map((stage, index) => (
          <div key={index}>
            <Card.Title>{stage.stage}</Card.Title>
            <Card.Text className="mb-4">
              Duration: {stage.duration}
              <br />
              Recommendations: {stage.recommendations}
            </Card.Text>
          </div>
        ))}
        <Card.Title className={styles.currentStageHeader}>
          Current Stage{" "}
          <Card.Text>
            <u>{cropData.currentStage}</u>
          </Card.Text>
        </Card.Title>
        <Card.Footer className="text-muted">
          {cropData.optedActions.map((action, index) => (
            <Card.Text key={index}>
              {action.date}: {action.action}
            </Card.Text>
          ))}
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default CropLifeCycleDisplay;

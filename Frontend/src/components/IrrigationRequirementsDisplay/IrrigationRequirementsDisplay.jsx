// IrrigationRequirementsDisplay.js
import React from "react";
import { Card } from "react-bootstrap";
import styles from "./IrrigationRequirementsDisplay.module.css"; // Ensure you create and link a CSS module for styling

const IrrigationRequirementsDisplay = ({ data }) => {
  return (
    <Card>
      <Card.Header className={styles.irrigationRequirementsHeader} as="h5">
        {data.crop} Irrigation Requirements
      </Card.Header>
      <Card.Body>
        {data.waterRequirements.map((requirement, index) => (
          <div key={index} className="mb-3">
            <Card.Title>{requirement.stage}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Water: {requirement.amount} per week
            </Card.Subtitle>
            <Card.Text>{requirement.advice}</Card.Text>
          </div>
        ))}
        <Card.Footer className="text-muted">
          Last Updated: {data.lastUpdated}
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default IrrigationRequirementsDisplay;

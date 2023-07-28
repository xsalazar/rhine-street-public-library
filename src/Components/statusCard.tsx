import { Chip } from "@mui/material";
import React from "react";
import "./index.css";

const StatusCard: React.FC<{ available: boolean }> = ({ available }) => {
  return (
    <div className="statusContainer">
      <Chip
        label={available ? "Available!" : "OUT"}
        variant="outlined"
        color={available ? "primary" : "warning"}
      />
    </div>
  );
};

export default StatusCard;

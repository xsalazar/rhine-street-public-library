import Chip from "@mui/material/Chip";
import "./index.css";

export default function StatusCard({ available }: { available: boolean }) {
  return (
    <div className="statusContainer">
      <Chip
        label={available ? "Available!" : "OUT"}
        variant="outlined"
        color={available ? "primary" : "warning"}
      />
    </div>
  );
}

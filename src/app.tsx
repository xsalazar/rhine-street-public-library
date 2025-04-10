import { Box } from "@mui/material";
import Body from "./Components/body";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        maxHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Body />
      <Box component="footer" sx={{ py: 2 }} />
    </div>
  );
}

import { Box } from "@mui/material";

export default function ColumnOfButtons({ children }) {
  return (
    <Box
      sx={{
        maxHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        overflow: "auto",
      }}
    >
      {children}
    </Box>
  );
}

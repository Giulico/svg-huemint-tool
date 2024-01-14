import { useSvgCode } from "../store";
import { Box } from "@mui/material";
import AdjacencyInput from "./AdjacencyInput";
import Temperature from "./Temperature";
import Mode from "./Mode";
import BlockedColors from "./BlockedColors";

export default function HuemintSettings({ colors }) {
  const { code } = useSvgCode();

  return (
    code && (
      <Box sx={{ mt: 5 }}>
        <Temperature />
        <AdjacencyInput colorAmount={colors.length} />
        <BlockedColors colorAmount={colors.length} />
        <Mode />
      </Box>
    )
  );
}

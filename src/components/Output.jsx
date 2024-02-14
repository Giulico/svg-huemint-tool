import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ErrorBoundary from "./ErrorBoundary";

import { useSvgCode, useResults } from "../store";
import { replaceColor } from "../utils/string";

export default function Output({ colors }) {
  const [output, setOutput] = useState(null);
  const { code, palette } = useSvgCode();
  const { isLoading } = useResults();

  useEffect(() => {
    // Loop the input colors, and replace them in code
    // Then update output
    let output = code;
    colors.forEach((color, i) => {
      output = replaceColor(output, color, palette[i]);
    });
    setOutput(output);
  }, [code, colors, palette]);

  if (isLoading || colors.length !== palette.length) return null;

  return (
    <>
      <Box sx={{ p: 3, flex: "1 1 auto" }}>
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
          <Box
            sx={{
              maxWidth: "65%",
              mx: "auto",
            }}
            dangerouslySetInnerHTML={{ __html: output }}
          />
        </ErrorBoundary>
      </Box>
    </>
  );
}

import { useCallback } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useResults, useSvgCode } from "../store";
import { arraysAreEqual } from "../utils/arrays";

function ResultsButtons() {
  const { palette: generatedPalette, setPalette } = useSvgCode();
  const { results, isLoading } = useResults();

  const handleClick = useCallback(
    (i) => () => {
      setPalette(results[i].palette);
    },
    [results, setPalette]
  );

  if (isLoading) return <CircularProgress />;

  return (
    <Box
      sx={{
        maxHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        overflow: "auto",
      }}
    >
      {results.map(({ palette }, i) => (
        <Box
          onClick={handleClick(i)}
          key={JSON.stringify(palette)}
          sx={{
            display: "flex",
            border: (theme) =>
              `1px solid ${
                arraysAreEqual(generatedPalette, palette)
                  ? theme.palette.primary.dark
                  : "transparent"
              }`,
            backgroundColor: (theme) =>
              arraysAreEqual(generatedPalette, palette)
                ? theme.palette.grey["900"]
                : "transparent",
            px: 2,
            py: 1,
            cursor: "pointer",
            transition: "all .3s",
            borderRadius: "4px",
            "&:hover": {
              border: `1px solid #ddd`,
            },
          }}
        >
          {palette.map((p) => (
            <Box
              key={p}
              sx={{
                width: "10px",
                height: "10px",
                backgroundColor: p,
              }}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
}
export default ResultsButtons;

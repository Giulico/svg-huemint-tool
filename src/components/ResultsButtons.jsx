import { useCallback } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useResults, useSavedColors, useSvgCode } from "../store";
import { isEqual } from "lodash";
import ColumnOfButtons from "./ColumnOfButtons";

function ResultsButtons() {
  const { palette: generatedPalette, setPalette } = useSvgCode();
  const { results, isLoading } = useResults();
  const { lists, selectedList } = useSavedColors();

  const handleClick = useCallback(
    (i) => () => {
      setPalette(results[i].palette);
    },
    [results, setPalette]
  );

  if (isLoading) return <CircularProgress />;

  return (
    <ColumnOfButtons>
      {results.map(({ palette }, i) => {
        const isSelected = isEqual(generatedPalette, palette);
        const isSaved = !!lists[selectedList].find((p) => isEqual(p, palette));
        return (
          <Box
            onClick={handleClick(i)}
            key={JSON.stringify(palette)}
            sx={{
              display: "flex",
              border: (theme) =>
                `1px solid ${
                  isSelected ? theme.palette.primary.dark : "transparent"
                }`,
              backgroundColor: (theme) => {
                if (isSelected) {
                  return isSaved
                    ? theme.palette.success.main
                    : theme.palette.grey["900"];
                } else {
                  return isSaved ? theme.palette.success.dark : "transparent";
                }
              },
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
        );
      })}
    </ColumnOfButtons>
  );
}
export default ResultsButtons;

import { Box, Chip } from "@mui/material";
import { useResults, useSavedColors, useSvgCode } from "../store";
import ColumnOfButtons from "./ColumnOfButtons";
import { isEqual } from "lodash";

export default function SavedListButtons() {
  const { palette: generatedPalette, setPalette } = useSvgCode();
  const { results } = useResults();
  const { lists, selectedList } = useSavedColors();

  return results.length && lists[selectedList].length ? (
    <ColumnOfButtons>
      <Chip
        label={selectedList}
        size="small"
        sx={{ mb: 0.5 }}
        variant="outlined"
      />
      {lists[selectedList].map((palette) => {
        const isSelected = isEqual(generatedPalette, palette);
        return (
          <Box
            onClick={() => setPalette(palette)}
            key={JSON.stringify(palette)}
            sx={{
              display: "flex",
              px: 2,
              py: 1,
              cursor: "pointer",
              transition: "all .3s",
              border: (theme) =>
                `1px solid ${
                  isSelected ? theme.palette.primary.dark : "transparent"
                }`,
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
  ) : null;
}

import { Box, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { useResults, useSavedColors, useSvgCode } from "../store";
import { useMemo } from "react";
import { useCallback } from "react";
import { isEqual } from "lodash";

export default function SavePalette() {
  const { results } = useResults();
  const { palette } = useSvgCode();
  const { lists, selectedList, setSelectedList, savePalette, removePalette } =
    useSavedColors();

  const listNames = useMemo(() => Object.keys(lists), []);

  const onListChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSelectedList(value);
    },
    [setSelectedList]
  );

  return results.length ? (
    <Box>
      <Box
        component="select"
        sx={{ p: 0.5 }}
        onChange={onListChange}
        defaultValue={selectedList}
      >
        {listNames.map((list) => (
          <Box component="option" key={list}>
            {list}
          </Box>
        ))}
      </Box>

      <Space />

      {lists[selectedList].find((p) => isEqual(p, palette)) ? (
        <Button
          startIcon={<DeleteIcon />}
          variant="contained"
          size="small"
          color="error"
          onClick={() => removePalette(selectedList, palette)}
        >
          Remove palette
        </Button>
      ) : (
        <Button
          startIcon={<SaveIcon />}
          variant="contained"
          size="small"
          onClick={() => savePalette(selectedList, palette)}
        >
          Add palette
        </Button>
      )}

      <Space />
    </Box>
  ) : null;
}

function Space() {
  return <Box sx={{ display: "inline-block", mx: 0.5 }} />;
}

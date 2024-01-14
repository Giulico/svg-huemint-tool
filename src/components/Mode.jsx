import { useCallback } from "react";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import { useMode } from "../store";

function Mode() {
  const { mode, setMode } = useMode();

  const onChange = useCallback(
    (e) => {
      setMode(e.target.value);
    },
    [setMode]
  );

  return (
    <Box sx={{ mt: 5 }}>
      <FormControl
        variant="filled"
        sx={{ mx: 1, width: "calc(100% - 24px)" }}
        size="small"
      >
        <InputLabel id="demo-select-small-label">Generation mode</InputLabel>
        <Select labelId="mode-label" id="mode" value={mode} onChange={onChange}>
          <MenuItem value="transformer">Transformer</MenuItem>
          <MenuItem value="diffusion">Diffusion</MenuItem>
          <MenuItem value="random">Random</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
export default Mode;

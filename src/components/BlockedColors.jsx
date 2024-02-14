import { useMemo, useCallback, useEffect } from "react";
import { useBlockedColros } from "../store";
import { Box, TextField } from "@mui/material";

export default function BlockedColors({ colorAmount }) {
  const { palette, setPalette, setPaletteColorAtIndex } = useBlockedColros();
  const colors_ = useMemo(() => Array.from(Array(colorAmount)), [colorAmount]);

  const handleChange = useCallback(
    (index) => (e) => {
      setPaletteColorAtIndex(index, e.target.value);
    },
    [setPaletteColorAtIndex]
  );

  useEffect(() => {
    if (!Array.isArray(palette) || palette.length !== colorAmount) {
      const newPalette = Array.from(Array(colorAmount), () => "");
      setPalette(newPalette);
    }
  }, [colorAmount, palette, setPalette]);

  return (
    <Box sx={{ mt: 3 }}>
      {colors_.map((_, i) => (
        <TextField
          label={`Color #${i + 1}`}
          variant="standard"
          key={i}
          sx={{ mx: 1, width: 80 }}
          onChange={handleChange(i)}
          defaultValue={palette[i]}
        />
      ))}
    </Box>
  );
}

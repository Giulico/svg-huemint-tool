import { Box, Button, Stack } from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import { useCallback } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { usePaletteMulti } from "../store";
import { useRef } from "react";
import { getDefaultPaletteMulti } from "../utils/paletteMulti";

export const COLUMNS_N = 10;

export default function PaletteMulti({ colorAmount }) {
  const { palette_multi, setPaletteMulti } = usePaletteMulti();

  const ref = useRef();
  const columns = useMemo(() => Array.from({ length: COLUMNS_N }), []);
  const colors_ = useMemo(() => Array.from(Array(colorAmount)), [colorAmount]);

  const defaultPaletteMulti = useMemo(() => {
    return getDefaultPaletteMulti(colorAmount, COLUMNS_N);
  }, [colorAmount]);

  useEffect(() => {
    if (!Array.isArray(palette_multi) || palette_multi.length !== COLUMNS_N) {
      console.log("set def", defaultPaletteMulti);
      setPaletteMulti(defaultPaletteMulti);
    }
  }, [defaultPaletteMulti, palette_multi, setPaletteMulti]);

  const handleChange = useCallback(
    (rowIndex, columnIndex) => (value) => {
      const newPaletteMulti = [...palette_multi];

      if (!newPaletteMulti[rowIndex]) {
        newPaletteMulti[rowIndex] = [];
      }

      newPaletteMulti[rowIndex][columnIndex] = ["", "-", "#1d1515"].includes(
        value
      )
        ? "-"
        : value;
      setPaletteMulti(newPaletteMulti);
    },
    [palette_multi, setPaletteMulti]
  );

  return (
    <Box ref={ref}>
      <Button
        size="small"
        color="primary"
        onClick={() => setPaletteMulti(defaultPaletteMulti)}
      >
        Empty table
      </Button>
      {columns.map((_, i) => {
        return (
          <Stack direction="row" key={i}>
            {colors_.map((_, j) => {
              return palette_multi?.[i]?.[j] ? (
                <MuiColorInput
                  size="small"
                  value={palette_multi[i][j]}
                  format="hex"
                  fallbackValue="#1d1515"
                  onChange={handleChange(i, j)}
                  onBlur={() => null}
                  key={`${i}-${j}`}
                  isAlphaHidden
                />
              ) : (
                "-"
              );
            })}
          </Stack>
        );
      })}
    </Box>
  );
}

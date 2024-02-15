import { useEffect, useCallback } from "react";
import { Button } from "@mui/material";
import ColorLensIcon from "@mui/icons-material/ColorLens";

import {
  useSvgCode,
  useAdjacency,
  useTemperature,
  useMode,
  useBlockedColros,
  useResults,
  usePaletteMulti,
} from "../store";
import { getDefaultPaletteMulti } from "../utils/paletteMulti";
import { COLUMNS_N } from "./PaletteMulti";
import { isEqual } from "lodash";

export default function GenerateButton({ colorsAmount }) {
  const { setResults, setLoading } = useResults();
  const { code, setPalette } = useSvgCode();
  const { adjacency } = useAdjacency();
  const { temperature } = useTemperature();
  const { mode } = useMode();
  const { palette } = useBlockedColros();
  const { palette_multi } = usePaletteMulti();

  const generate = useCallback(async () => {
    console.group("Generate settings");
    console.log("adjacency", adjacency);
    console.log("temperature", temperature);
    console.log("palette", palette);
    console.log("palette_multi", palette_multi);
    console.log("mode", mode);
    console.groupEnd();

    const defaultPaletteMulti = getDefaultPaletteMulti(colorsAmount, COLUMNS_N);

    const json_data = {
      mode, // transformer, diffusion or random
      num_colors: colorsAmount, // max 12, min 2
      temperature, // max 2.4, min 0
      num_results: 50, // max 50 for transformer, 5 for diffusion
      adjacency, // nxn adjacency matrix as a flat array of strings
      palette, // locked colors as hex codes, or '-' if blank
      palette_multi: isEqual(defaultPaletteMulti, palette_multi)
        ? undefined
        : palette_multi,
    };

    setLoading(true);

    const hueMintRes = await fetch("https://api.huemint.com/color", {
      method: "POST",
      body: JSON.stringify(json_data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((r) => r.json());

    if (Array.isArray(hueMintRes?.results) && hueMintRes.results.length) {
      setResults(hueMintRes.results);
      setPalette(hueMintRes.results[0].palette);
    }
    setLoading(false);
  }, [
    adjacency,
    temperature,
    palette,
    palette_multi,
    mode,
    colorsAmount,
    setLoading,
    setResults,
    setPalette,
  ]);

  useEffect(() => {
    setResults([]);
  }, [colorsAmount, setResults]);

  return (
    <Button
      disabled={!code}
      onClick={generate}
      color="secondary"
      variant="contained"
      endIcon={<ColorLensIcon />}
      fullWidth
      sx={{ mt: 3 }}
    >
      Generate
    </Button>
  );
}

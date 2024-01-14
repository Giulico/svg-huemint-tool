import { useCallback } from "react";
import { Slider, Typography } from "@mui/material";
import { useTemperature } from "../store";

export default function Temperature() {
  const { temperature, setTemperature } = useTemperature();

  const changeTemperature = useCallback(
    (_, newValue) => {
      setTemperature(newValue);
    },
    [setTemperature]
  );

  return (
    <>
      <Typography variant="h6" color="primary.contrastText" sx={{ mt: 3 }}>
        Temperature (Creativity)
      </Typography>

      <Slider
        value={temperature}
        min={0}
        max={2.4}
        step={0.1}
        aria-label="Temperature"
        valueLabelDisplay="auto"
        color="secondary"
        onChange={changeTemperature}
      />
    </>
  );
}

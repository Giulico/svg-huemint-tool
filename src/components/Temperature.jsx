import { useCallback } from "react";
import { Slider } from "@mui/material";
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
  );
}

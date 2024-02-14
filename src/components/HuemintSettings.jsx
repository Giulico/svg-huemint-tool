import { useSvgCode } from "../store";
import {
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import AdjacencyInput from "./AdjacencyInput";
import Temperature from "./Temperature";
import Mode from "./Mode";
import BlockedColors from "./BlockedColors";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import PaletteMulti from "./PaletteMulti";

export default function HuemintSettings({ colors }) {
  const { code } = useSvgCode();
  const [expanded, setExpanded] = useState("");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : "");
  };

  return (
    code && (
      <Box>
        <Accordion
          disableGutters
          expanded={expanded === "temperature"}
          onChange={handleChange("temperature")}
        >
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            sx={{
              backgroundColor: (theme) => theme.palette.secondary.dark,
            }}
          >
            <Typography>Temperature</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              backgroundColor: (theme) => theme.palette.primary.dark,
            }}
          >
            <Temperature />
          </AccordionDetails>
        </Accordion>

        <Accordion
          disableGutters
          expanded={expanded === "adjacency"}
          onChange={handleChange("adjacency")}
        >
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            sx={{
              backgroundColor: (theme) => theme.palette.secondary.dark,
            }}
          >
            <Typography>Adjacency</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              backgroundColor: (theme) => theme.palette.primary.dark,
            }}
          >
            <AdjacencyInput colorAmount={colors.length} />
          </AccordionDetails>
        </Accordion>

        <Accordion
          disableGutters
          expanded={expanded === "blockedcolors"}
          onChange={handleChange("blockedcolors")}
        >
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            sx={{
              backgroundColor: (theme) => theme.palette.secondary.dark,
            }}
          >
            <Typography>Blocked colors</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              backgroundColor: (theme) => theme.palette.primary.dark,
            }}
          >
            <BlockedColors colorAmount={colors.length} />
          </AccordionDetails>
        </Accordion>

        <Accordion
          disableGutters
          expanded={expanded === "palettemulti"}
          onChange={handleChange("palettemulti")}
        >
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            sx={{
              backgroundColor: (theme) => theme.palette.secondary.dark,
            }}
          >
            <Typography>Palette multi</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              backgroundColor: (theme) => theme.palette.primary.dark,
            }}
          >
            <PaletteMulti colorAmount={colors.length} />
          </AccordionDetails>
        </Accordion>

        <Mode />
      </Box>
    )
  );
}

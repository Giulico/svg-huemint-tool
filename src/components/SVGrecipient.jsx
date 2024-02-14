import { useCallback } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

import { useSvgCode } from "../store";

import ErrorBoundary from "./ErrorBoundary";

export default function SVGrecipient({ colors }) {
  const { code, addCode } = useSvgCode();

  const changeHandler = useCallback(
    (e) => {
      addCode(e.target.value);
    },
    [addCode]
  );

  return (
    <Box sx={{ p: 1 }}>
      <TextareaAutosize
        aria-label="SVG Recipient"
        minRows={3}
        maxRows={6}
        placeholder="Paste the SVG code here."
        style={{ width: "100%" }}
        onChange={changeHandler}
        defaultValue={code}
      />

      {code && (
        <Accordion>
          <AccordionSummary
            id="preview"
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
            }}
          >
            Preview
          </AccordionSummary>
          <AccordionDetails
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
            }}
          >
            <ErrorBoundary fallback={<p>Something went wrong</p>}>
              <Box
                component="iframe"
                src={`data:text/html,${encodeURIComponent(code)}`}
                sx={{ width: 200, height: 200, border: "none" }}
                // dangerouslySetInnerHTML={{ __html: code }}
              />
            </ErrorBoundary>

            <Typography variant="body2" sx={{ mb: 1 }}>
              Detected colors:
            </Typography>
            <Stack
              direction="row"
              gap={2}
              sx={{ placeItems: "center", flexWrap: "wrap" }}
            >
              {colors?.map((color) => (
                <Stack
                  key={color}
                  direction="row"
                  sx={{ placeItems: "center" }}
                >
                  <Box
                    sx={{
                      backgroundColor: color,
                      width: "10px",
                      height: "10px",
                    }}
                  />
                  <Typography variant="caption">{color}</Typography>
                </Stack>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
}

import { useMemo } from "react";
import { removeCaseDuplicates } from "../utils/arrays";
import { CssBaseline, Box, AppBar, Toolbar, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SVGrecipient from "./SVGrecipient";
import HuemintSettings from "./HuemintSettings";
import GenerateButton from "./GenerateButton";
import ResultsButtons from "./ResultsButtons";
import Output from "./Output";
import { useSvgCode } from "../store";
import SavePalette from "./SavePalette";
import SavedListButtons from "./SavedListButtons";
import ExportList from "./ExportList";
import { grey } from "@mui/material/colors";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const { code } = useSvgCode();

  const colors = useMemo(() => {
    const regex = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\b/g;
    const hexColorsMatch = code.match(regex);
    if (!Array.isArray(hexColorsMatch) || hexColorsMatch.length === 0) {
      return [];
    }
    const colors = removeCaseDuplicates(hexColorsMatch);
    return colors;
  }, [code]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Box sx={{ display: "flex" }}>
        <Box
          component="nav"
          sx={{
            width: "25%",
            flexShrink: 0,
            backgroundColor: grey["900"],
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Typography variant="h6" sx={{ px: 1 }}>
            SVG recipient
          </Typography>
          <SVGrecipient colors={colors} />

          <Typography variant="h6" sx={{ px: 1, mt: 3 }}>
            Settings
          </Typography>
          <HuemintSettings colors={colors} />

          <Box sx={{ px: 3 }}>
            <GenerateButton colorsAmount={colors.length} />
          </Box>
        </Box>
        <Box sx={{ flex: "1 1 auto" }}>
          <AppBar position="static" sx={{ width: "auto" }}>
            <Toolbar>
              <SavePalette />
              <ExportList />
            </Toolbar>
          </AppBar>
          <Box sx={{ flex: 1, display: "flex", flexDirection: "row" }}>
            <ResultsButtons />
            <SavedListButtons />
            <Output colors={colors} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

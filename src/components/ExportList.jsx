import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Box, Button } from "@mui/material";
import { useResults, useSavedColors } from "../store";
import { useCallback } from "react";

export default function ExportList() {
  const { results } = useResults();
  const { lists, selectedList } = useSavedColors();

  const exportList = useCallback(() => {
    const dataStr = JSON.stringify({ [selectedList]: lists[selectedList] });
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedList}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [lists, selectedList]);

  return results.length && lists[selectedList].length ? (
    <Box>
      <Button
        variant="outlined"
        startIcon={<FileDownloadIcon />}
        onClick={exportList}
      >
        Export list
      </Button>
    </Box>
  ) : null;
}

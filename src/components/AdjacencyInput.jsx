import { useMemo, useCallback, useRef, useState, useEffect } from "react";
import { useAdjacency } from "../store";
import {
  Typography,
  IconButton,
  Button,
  Box,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";

export default function AdjacencyInput({ colorAmount }) {
  const storeAdjacency = useAdjacency();
  const formRef = useRef();
  const savesRef = useRef();
  const nameRef = useRef();
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const columns = useMemo(
    () => Array.from(Array(colorAmount + 1)),
    [colorAmount]
  );
  const rows = useMemo(() => Array.from(Array(colorAmount)), [colorAmount]);

  const defaultAdjacency = useMemo(() => {
    const res = [];

    for (let i = 0; i < colorAmount; i++) {
      for (let j = 0; j < colorAmount; j++) {
        res.push(j > i ? `${(j - i) * 10}` : `0`);
      }
    }
    return res;
  }, [colorAmount]);

  const adjacency = useMemo(() => {
    // if preset, return the preset
    if (Array.isArray(storeAdjacency.adjacency)) {
      return storeAdjacency.adjacency;
    }

    // else, return the default
    return defaultAdjacency;
  }, [defaultAdjacency, storeAdjacency.adjacency]);

  const save = useCallback(() => {
    // name validation
    const nameField = nameRef.current?.querySelector("input");
    if (
      !nameField?.value ||
      storeAdjacency.savedAdjacency.find(({ name }) => name === nameField.value)
    ) {
      nameField?.focus?.();
      return;
    }
    const name = nameField.value;

    // get new adjacency
    const newAdjacency = [];
    for (let i = 0; i < colorAmount * colorAmount; i++) {
      const field = formRef.current[i];
      newAdjacency.push(field.value);
    }

    // store
    storeAdjacency.saveAdjacency({ name, adjacency: newAdjacency });

    setDialogOpen(false);
  }, [colorAmount, storeAdjacency]);

  const loadAdjacency = useCallback(
    (e) => {
      const value = e.target.value;
      const newAdjacency = value.split(",");
      storeAdjacency.setAdjacency(newAdjacency);
    },
    [storeAdjacency]
  );

  const remove = useCallback(() => {
    const name =
      savesRef.current.children[savesRef.current.selectedIndex].innerText;
    if (name === "Load adjacency" || name === "Default") {
      return;
    }
    storeAdjacency.removeAdjacency(name);
    storeAdjacency.setAdjacency(defaultAdjacency);
  }, [defaultAdjacency, storeAdjacency]);

  const changeAdjacency = useCallback(
    (index) => (e) => {
      storeAdjacency.setAdjacencyAtIndex(index, e.target.value);
    },
    [storeAdjacency]
  );

  useEffect(() => {
    if (
      !Array.isArray(storeAdjacency.adjacency) ||
      storeAdjacency.adjacency.length !== colorAmount ** 2
    ) {
      storeAdjacency.setAdjacency(defaultAdjacency);
    }
  }, [colorAmount, defaultAdjacency, storeAdjacency]);

  return (
    <Box sx={{ mt: 3 }}>
      <Stack direction="row" sx={{ placeItems: "center" }}>
        <Box>
          <Box
            ref={savesRef}
            component="select"
            sx={{ p: 0.5 }}
            defaultValue="placeholder"
            onChange={loadAdjacency}
          >
            <Box component="option" disabled value="placeholder">
              Load adjacency
            </Box>
            <Box component="option" value={defaultAdjacency.join(",")}>
              Default
            </Box>
            {storeAdjacency.savedAdjacency
              .filter(
                ({ adjacency }) => Math.sqrt(adjacency.length) === colorAmount
              )
              .map(({ name, adjacency }) => (
                <Box key={name} component="option" value={adjacency}>
                  {name}
                </Box>
              ))}
          </Box>
        </Box>
        <Box>
          <IconButton size="small" onClick={openDialog}>
            💾
          </IconButton>
        </Box>
        <Box>
          <IconButton size="small" onClick={remove}>
            🗑️
          </IconButton>
        </Box>
      </Stack>

      <Box component="form" ref={formRef}>
        <Box component="table">
          <Box component="thead">
            <Box component="tr">
              {columns.map((c, i) =>
                i === 0 ? (
                  <Box component="th" key={i} />
                ) : (
                  <Box component="th" key={i}>
                    {i}
                  </Box>
                )
              )}
            </Box>
          </Box>
          <Box component="tbody">
            {adjacency &&
              rows.map((r, i) => (
                <Box component="tr" key={i}>
                  {columns.map((c, j) =>
                    j === 0 ? (
                      <Box component="th" key={`${i}-${j}`}>
                        {i + 1}
                      </Box>
                    ) : (
                      <Box component="td" key={`${i}-${j}`}>
                        <Box
                          key={`${i}-${j}__${JSON.stringify(adjacency)}`}
                          component="input"
                          sx={{ width: "25px" }}
                          defaultValue={adjacency[colorAmount * i + (j - 1)]}
                          onChange={changeAdjacency(colorAmount * i + (j - 1))}
                        />
                      </Box>
                    )
                  )}
                </Box>
              ))}
          </Box>
        </Box>
      </Box>

      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Save adjacency</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please enter the saving name.
          </DialogContentText>
          <TextField
            ref={nameRef}
            id="name"
            label="Name"
            variant="filled"
            sx={{ width: "100%" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={save} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

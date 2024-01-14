import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { isValidHexColor } from "../utils/string";

const prefix = "svg-huemint-tool_";

export const useSvgCode = create(
  devtools(
    persist(
      (set) => ({
        code: "",
        palette: [],
        addCode: (newCode) => set({ code: newCode }),
        setPalette: (newPalette) => set({ palette: newPalette }),
      }),
      {
        name: `${prefix}svg`,
      }
    ),
    { name: "useSvgCode" }
  )
);

export const useMode = create(
  devtools(
    persist(
      (set) => ({
        mode: "transformer",
        setMode: (newMode) => set({ mode: newMode }),
      }),
      {
        name: `${prefix}mode`,
      }
    )
  ),
  { name: "useMode" }
);

export const useBlockedColros = create(
  devtools(
    persist(
      (set, get) => ({
        palette: [],
        setPalette: (newPalette) => set({ palette: newPalette }),
        setPaletteColorAtIndex: (index, newColor) => {
          if (isValidHexColor(newColor)) {
            const updatedPalette = [...get().palette];
            updatedPalette[index] = newColor;
            set({ palette: updatedPalette });
          }
        },
      }),
      {
        name: `${prefix}blockedColors`,
      }
    ),
    { name: "useBlockedColros" }
  )
);

export const useTemperature = create(
  devtools(
    persist(
      (set) => ({
        temperature: 1.3,
        setTemperature: (newTemperature) =>
          set({ temperature: newTemperature }),
      }),
      {
        name: `${prefix}temperature`,
      }
    ),
    { name: "useTemperature" }
  )
);

export const useAdjacency = create(
  devtools(
    persist(
      (set, get) => ({
        adjacency: null,
        savedAdjacency: [],
        setAdjacency: (newAdjacency) => {
          set({ adjacency: newAdjacency });
        },
        setAdjacencyAtIndex: (index, newValue) => {
          if (Number.isFinite(Number(newValue))) {
            const updatedAdjacency = [...get().adjacency];
            updatedAdjacency[index] = newValue;
            set({ adjacency: updatedAdjacency });
          }
        },
        saveAdjacency: ({ name, adjacency }) =>
          set({
            savedAdjacency: [
              ...get().savedAdjacency,
              {
                name,
                adjacency,
              },
            ],
          }),
        removeAdjacency: (removeName) =>
          set({
            savedAdjacency: get().savedAdjacency.filter(
              ({ name }) => name !== removeName
            ),
          }),
      }),
      {
        name: `${prefix}adjacency`,
      }
    ),
    { name: "useAdjacency" }
  )
);

export const useResults = create(
  devtools(
    persist(
      (set) => ({
        results: [],
        isLoading: false,
        setResults: (newResults) => set({ results: newResults }),
        setLoading: (isLoading) => set({ isLoading }),
      }),
      {
        name: `${prefix}results`,
      }
    ),
    { name: "useResults" }
  )
);

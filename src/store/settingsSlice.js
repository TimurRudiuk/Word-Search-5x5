import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_SETTINGS = {
  gridSize: 5,
  wordCount: 6
};

const getSavedSettings = () => {
  const raw = localStorage.getItem("wordSearchSettings");
  if (!raw) return DEFAULT_SETTINGS;

  try {
    const parsed = JSON.parse(raw);

    const gridSize = Number(parsed.gridSize);
    const wordCount = Number(parsed.wordCount);

    if (!Number.isFinite(gridSize) || !Number.isFinite(wordCount)) return DEFAULT_SETTINGS;

    return { gridSize, wordCount };
  } catch {
    return DEFAULT_SETTINGS;
  }
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: DEFAULT_SETTINGS,
  reducers: {
    loadSettings(state) {
      const saved = getSavedSettings();
      state.gridSize = saved.gridSize;
      state.wordCount = saved.wordCount;
    },
    updateSettings(state, action) {
      state.gridSize = action.payload.gridSize;
      state.wordCount = action.payload.wordCount;

      localStorage.setItem(
        "wordSearchSettings",
        JSON.stringify({ gridSize: state.gridSize, wordCount: state.wordCount })
      );
    },
    resetSettings(state) {
      state.gridSize = DEFAULT_SETTINGS.gridSize;
      state.wordCount = DEFAULT_SETTINGS.wordCount;
      localStorage.removeItem("wordSearchSettings");
    }
  }
});

export const { loadSettings, updateSettings, resetSettings } = settingsSlice.actions;
export default settingsSlice.reducer;

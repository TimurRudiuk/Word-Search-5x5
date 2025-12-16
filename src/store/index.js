import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./settingsSlice";
import resultsReducer from "./resultsSlice";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    results: resultsReducer
  }
});

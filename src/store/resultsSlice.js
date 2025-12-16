import { createSlice } from "@reduxjs/toolkit";

const resultsSlice = createSlice({
  name: "results",
  initialState: {
    list: [],              
    isGameComplete: false, 
    currentResult: null    
  },
  reducers: {
    addResult(state, action) {
      state.list.unshift(action.payload);
      state.currentResult = action.payload;
      state.isGameComplete = true;
    },
    closeModal(state) {
      state.isGameComplete = false;
      state.currentResult = null;
    },
    clearResults(state) {
      state.list = [];
      state.isGameComplete = false;
      state.currentResult = null;
    }
  }
});

export const { addResult, closeModal, clearResults } = resultsSlice.actions;
export default resultsSlice.reducer;

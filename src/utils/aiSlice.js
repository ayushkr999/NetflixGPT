import { createSlice } from "@reduxjs/toolkit";

const aiSlice = createSlice({
  name: "ai",
  initialState: {
    showAiSearch: false,
    movieNames: null,
    movieResults: null,
    isLoading: false,
    error: null,
    lastQuery: "",
  },
  reducers: {
    toggleAiSearchView: (state) => {
      state.showAiSearch = !state.showAiSearch;
    },
    setAiSearchView: (state, action) => {
      state.showAiSearch = action.payload;
    },
    startAiSearch: (state, action) => {
      state.isLoading = true;
      state.error = null;
      state.lastQuery = action.payload || "";
    },
    addAiMovieResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
      state.isLoading = false;
      state.error = null;
    },
    setAiError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearAiResults: (state) => {
      state.movieNames = null;
      state.movieResults = null;
      state.isLoading = false;
      state.error = null;
      state.lastQuery = "";
    },
  },
});

export const {
  toggleAiSearchView,
  setAiSearchView,
  startAiSearch,
  addAiMovieResult,
  setAiError,
  clearAiResults,
} = aiSlice.actions;

export default aiSlice.reducer;


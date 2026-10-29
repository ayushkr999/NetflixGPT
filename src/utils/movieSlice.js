import { createSlice } from "@reduxjs/toolkit";
import { CURATED_MOVIES_DATA } from "./curatedMoviesData";

const initialCategories = {
  popular: CURATED_MOVIES_DATA.popular?.movies || [],
  topRated: CURATED_MOVIES_DATA.topRated?.movies || [],
  action: CURATED_MOVIES_DATA.action?.movies || [],
  comedy: CURATED_MOVIES_DATA.comedy?.movies || [],
  romance: CURATED_MOVIES_DATA.romance?.movies || [],
  horror: CURATED_MOVIES_DATA.horror?.movies || [],
  sciFi: CURATED_MOVIES_DATA.sciFi?.movies || [],
};

const initialFeatured =
  initialCategories.popular && initialCategories.popular.length > 0
    ? initialCategories.popular[0]
    : null;

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    // Instant curated collections from verified OMDb data
    categories: initialCategories,
    featuredMovie: initialFeatured,
    selectedMovie: null, // Active movie for MovieDetails modal

    // Normal search state
    searchQuery: "",
    searchResults: null,
    isSearching: false,
    searchError: null,

    // Category loading & error states
    loadingCategories: false,
    categoriesError: null,
  },
  reducers: {
    setCategoryMovies: (state, action) => {
      const { categoryKey, movies } = action.payload;
      if (state.categories[categoryKey] !== undefined) {
        state.categories[categoryKey] = movies;
      }
      if (!state.featuredMovie && movies && movies.length > 0) {
        state.featuredMovie = movies[0];
      }
    },
    setAllCategories: (state, action) => {
      state.categories = { ...state.categories, ...action.payload };
      if (!state.featuredMovie) {
        const firstCategory = Object.values(action.payload)[0];
        if (firstCategory && firstCategory.length > 0) {
          state.featuredMovie = firstCategory[0];
        }
      }
    },
    setFeaturedMovie: (state, action) => {
      state.featuredMovie = action.payload;
    },
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
      state.isSearching = false;
      state.searchError = null;
    },
    setSearching: (state, action) => {
      state.isSearching = action.payload;
      if (action.payload) {
        state.searchError = null;
      }
    },
    setSearchError: (state, action) => {
      state.searchError = action.payload;
      state.isSearching = false;
    },
    clearSearchResults: (state) => {
      state.searchResults = null;
      state.searchQuery = "";
      state.searchError = null;
      state.isSearching = false;
    },
    setLoadingCategories: (state, action) => {
      state.loadingCategories = action.payload;
    },
    setCategoriesError: (state, action) => {
      state.categoriesError = action.payload;
      state.loadingCategories = false;
    },
  },
});

export const {
  setCategoryMovies,
  setAllCategories,
  setFeaturedMovie,
  setSelectedMovie,
  clearSelectedMovie,
  setSearchQuery,
  setSearchResults,
  setSearching,
  setSearchError,
  clearSearchResults,
  setLoadingCategories,
  setCategoriesError,
} = movieSlice.actions;

export default movieSlice.reducer;

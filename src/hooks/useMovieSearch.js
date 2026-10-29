import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchMovies } from "../utils/movieApi";
import {
  setSearchResults,
  setSearching,
  setSearchError,
  setSearchQuery,
  clearSearchResults,
} from "../utils/movieSlice";

export const useMovieSearch = () => {
  const dispatch = useDispatch();
  const { searchQuery, searchResults, isSearching, searchError } = useSelector(
    (store) => store.movies
  );
  const [page, setPage] = useState(1);

  const executeSearch = useCallback(
    async (query, pageNum = 1) => {
      const trimmed = query?.trim();
      if (!trimmed) {
        dispatch(clearSearchResults());
        return;
      }

      dispatch(setSearchQuery(trimmed));
      dispatch(setSearching(true));

      try {
        const response = await searchMovies(trimmed, pageNum);

        if (response.error) {
          dispatch(setSearchError(response.error));
          dispatch(setSearchResults([]));
        } else {
          dispatch(setSearchResults(response.results));
          setPage(pageNum);
        }
      } catch (err) {
        console.error("Movie search error:", err);
        dispatch(
          setSearchError("Unable to load movies. Please try again.")
        );
      }
    },
    [dispatch]
  );

  const clearSearch = useCallback(() => {
    dispatch(clearSearchResults());
  }, [dispatch]);

  return {
    query: searchQuery,
    results: searchResults,
    loading: isSearching,
    error: searchError,
    page,
    executeSearch,
    clearSearch,
  };
};

export default useMovieSearch;


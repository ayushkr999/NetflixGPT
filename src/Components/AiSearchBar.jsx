import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { recommendMoviesWithGemini } from "../utils/gemini";
import { getMoviesByTitles, searchMovies } from "../utils/movieApi";
import {
  addAiMovieResult,
  setAiError,
  startAiSearch,
} from "../utils/aiSlice";
import {
  setSearchResults,
  setSearching,
  setSearchError,
} from "../utils/movieSlice";

const AiSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang) || "en";
  const currentLang = lang[langKey] || lang.en;

  const [searchMode, setSearchMode] = useState("ai"); // "ai" | "direct"
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  const searchInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleSearch = async (overrideQuery) => {
    const rawQuery =
      typeof overrideQuery === "string"
        ? overrideQuery
        : searchInputRef.current?.value || "";
    const query = rawQuery.trim();

    if (!query) {
      setLocalError("Please enter a search prompt or movie name.");
      return;
    }

    if (searchInputRef.current) {
      searchInputRef.current.value = query;
    }

    setLocalLoading(true);
    setLocalError(null);

    if (searchMode === "ai") {
      dispatch(startAiSearch(query));
      try {
        // Step 1: Gemini returns 5 to 10 real movie titles
        const movieTitles = await recommendMoviesWithGemini(query);

        // Step 2: Fetch real movie details from OMDb in parallel
        const omdbMovies = await getMoviesByTitles(movieTitles);

        if (omdbMovies.length === 0) {
          throw new Error(
            "Could not find matching movie details on OMDb. Please try a different query."
          );
        }

        dispatch(
          addAiMovieResult({
            movieNames: movieTitles,
            movieResults: omdbMovies,
          })
        );
      } catch (err) {
        console.error("Gemini AI Search Error:", err);
        const errMsg =
          err?.message ||
          "Gemini recommendations are temporarily unavailable. Please try again.";
        setLocalError(errMsg);
        dispatch(setAiError(errMsg));
      } finally {
        setLocalLoading(false);
      }
    } else {
      // Direct OMDb search mode
      dispatch(setSearching(true));
      try {
        const response = await searchMovies(query);
        if (response.error) {
          setLocalError(response.error);
          dispatch(setSearchError(response.error));
          dispatch(setSearchResults([]));
        } else {
          dispatch(setSearchResults(response.results));
        }
      } catch (err) {
        console.error("Direct Search Error:", err);
        const errMsg = "Unable to load movies. Please try again.";
        setLocalError(errMsg);
        dispatch(setSearchError(errMsg));
      } finally {
        setLocalLoading(false);
        dispatch(setSearching(false));
      }
    }
  };

  const handleExampleClick = (example) => {
    if (searchInputRef.current) {
      searchInputRef.current.value = example;
    }
    handleSearch(example);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pt-24 md:pt-28 flex flex-col items-center">
      {/* Mode Selector Tabs */}
      <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-zinc-700/60 mb-5 shadow-lg">
        <button
          onClick={() => {
            setSearchMode("ai");
            setLocalError(null);
          }}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 ${
            searchMode === "ai"
              ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-900/40"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {currentLang.aiMode}
        </button>

        <button
          onClick={() => {
            setSearchMode("direct");
            setLocalError(null);
          }}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 ${
            searchMode === "direct"
              ? "bg-gradient-to-r from-zinc-700 to-zinc-800 text-white shadow-md"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {currentLang.normalMode}
        </button>
      </div>

      {/* Main Search Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="w-full bg-black/80 backdrop-blur-xl border border-zinc-700/80 rounded-2xl p-2.5 flex flex-col sm:flex-row items-center gap-2.5 shadow-2xl"
      >
        <div className="relative flex-1 w-full flex items-center">
          <span className="absolute left-4 text-gray-400 text-lg">
            {searchMode === "ai" ? "✨" : "🔍"}
          </span>
          <input
            ref={searchInputRef}
            type="text"
            disabled={localLoading}
            placeholder={
              searchMode === "ai"
                ? currentLang.aiSearchPlaceholder
                : currentLang.normalSearchPlaceholder
            }
            className="w-full bg-zinc-900/90 text-white placeholder-gray-400 pl-11 pr-4 py-3.5 rounded-xl text-sm md:text-base border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-red-600 transition disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={localLoading}
          className="w-full sm:w-auto px-7 py-3.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold rounded-xl text-sm md:text-base transition duration-200 shadow-lg shadow-red-900/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
        >
          {localLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>{searchMode === "ai" ? "Gemini is thinking..." : "Searching..."}</span>
            </>
          ) : (
            <span>{currentLang.search}</span>
          )}
        </button>
      </form>

      {/* Example Prompt Chips (AI mode) */}
      {searchMode === "ai" && currentLang.examples && (
        <div className="w-full mt-4 flex flex-wrap items-center gap-2 justify-center">
          <span className="text-xs text-gray-400 font-medium">
            {currentLang.tryExamples}
          </span>
          {currentLang.examples.map((example, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleExampleClick(example)}
              className="text-xs bg-zinc-900/80 hover:bg-zinc-800 text-gray-300 hover:text-white px-3 py-1.5 rounded-full border border-zinc-700/60 transition active:scale-95"
            >
              💡 {example}
            </button>
          ))}
        </div>
      )}

      {/* Error Message Alert */}
      {localError && (
        <div className="w-full mt-4 p-4 bg-red-950/70 border border-red-800 text-red-200 text-sm rounded-xl text-center shadow-lg flex items-center justify-center gap-2">
          <span>⚠️</span>
          <span>{localError}</span>
        </div>
      )}

      {/* Powered by Gemini & OMDb Badge */}
      <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4772 12 22C12 16.4772 16.4772 12 22 12C16.4772 12 12 7.52285 12 2Z"
            fill="url(#gemini-badge-sb)"
          />
          <defs>
            <linearGradient id="gemini-badge-sb" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4E8BF5" />
              <stop offset="0.5" stopColor="#9B72CF" />
              <stop offset="1" stopColor="#D96570" />
            </linearGradient>
          </defs>
        </svg>
        <span>{currentLang.poweredBy}</span>
      </div>
    </div>
  );
};

export default AiSearchBar;


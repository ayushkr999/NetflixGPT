import React from "react";
import { useSelector } from "react-redux";
import MovieGrid from "./MovieGrid";
import lang from "../utils/languageConstants";

const AiMovieSuggestions = () => {
  const { movieNames, movieResults, isLoading, lastQuery } = useSelector(
    (store) => store.ai
  );
  const { searchResults, isSearching, searchQuery, searchError } = useSelector(
    (store) => store.movies
  );
  const langKey = useSelector((store) => store.config.lang) || "en";
  const currentLang = lang[langKey] || lang.en;

  // Loading skeleton while searching
  if (isLoading || isSearching) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-300 font-medium text-sm md:text-base">
            {isLoading ? currentLang.thinking : currentLang.searching}
          </p>
        </div>
      </div>
    );
  }

  // Gemini AI Movie Recommendations View
  if (movieResults && movieResults.length > 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <MovieGrid
          title={currentLang.recommendationsTitle}
          subtitle={`Tailored recommendations for: "${lastQuery}" · Powered by Google Gemini & OMDb`}
          movies={movieResults}
        />
      </div>
    );
  }

  // Direct OMDb Search Results View
  if (searchResults && searchResults.length > 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <MovieGrid
          title={currentLang.searchResultsTitle}
          subtitle={`Showing matches for: "${searchQuery}"`}
          movies={searchResults}
        />
      </div>
    );
  }

  // Empty state after a search returned no results
  if (searchResults && searchResults.length === 0) {
    return (
      <div className="w-full max-w-xl mx-auto px-4 py-16 text-center">
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8 backdrop-blur-md">
          <div className="text-4xl mb-3">🎬</div>
          <h3 className="text-lg font-bold text-white mb-1">
            {currentLang.noMoviesFound}
          </h3>
          <p className="text-sm text-gray-400">
            {searchError || "Try searching for a different title or keyword."}
          </p>
        </div>
      </div>
    );
  }

  // Initial Discovery State
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-16 text-center">
      <div className="bg-black/40 border border-zinc-800/80 rounded-2xl p-8 backdrop-blur-md space-y-4 shadow-xl">
        <div className="inline-block p-4 rounded-full bg-red-600/10 border border-red-500/20 text-3xl">
          ✨
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white">
          Intelligent Gemini AI Movie Discovery
        </h3>
        <p className="text-sm md:text-base text-gray-300 max-w-lg mx-auto leading-relaxed">
          Describe any movie mood, plot concept, or genre in English, Hindi, or Spanish. Google Gemini AI will understand your intent and recommend real titles verified with live OMDb movie data.
        </p>
      </div>
    </div>
  );
};

export default AiMovieSuggestions;


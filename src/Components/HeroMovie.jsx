import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedMovie } from "../utils/movieSlice";
import { FALLBACK_POSTER } from "../utils/constant";

const HeroMovie = ({ movie }) => {
  const dispatch = useDispatch();

  if (!movie) return null;

  const {
    Title,
    title,
    Year,
    year,
    Genre,
    genre,
    imdbRating,
    rating,
    Plot,
    plot,
    Poster,
    poster,
    Director,
    director,
    Runtime,
    runtime,
  } = movie;

  const displayTitle = title || Title || "Featured Movie";
  const displayYear = year || Year || "";
  const displayGenre = genre || Genre || "";
  const displayRating = rating || imdbRating || "N/A";
  const displayPlot = plot || Plot || "Discover thrilling cinema tailored just for you.";
  const displayPoster = poster || (Poster && Poster !== "N/A" ? Poster : FALLBACK_POSTER);
  const displayDirector = director || Director || "";
  const displayRuntime = runtime || Runtime || "";

  const handleOpenDetails = () => {
    dispatch(setSelectedMovie(movie));
  };

  return (
    <div className="relative w-full min-h-[70vh] md:min-h-[85vh] flex items-center bg-black overflow-hidden pt-20 md:pt-0">
      {/* Dynamic blurred background glow derived from the movie poster */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-25 scale-110 pointer-events-none transition-all duration-700"
        style={{ backgroundImage: `url(${displayPoster})` }}
      />

      {/* Cinematic gradient overlays for true Netflix feel */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />

      {/* Main hero content container */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 py-12 w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        {/* Left Column: Metadata & Actions */}
        <div className="w-full md:w-3/5 space-y-4 md:space-y-6 text-left">
          {/* Spotlight Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs md:text-sm font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            Featured Spotlight
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md">
            {displayTitle}
          </h1>

          {/* Badges: Rating, Year, Runtime, Genre */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300 font-medium">
            {displayRating !== "N/A" && (
              <span className="flex items-center gap-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 px-2.5 py-0.5 rounded font-bold">
                ⭐ {displayRating}
              </span>
            )}
            {displayYear && (
              <span className="bg-zinc-800 px-2.5 py-0.5 rounded border border-zinc-700">
                {displayYear}
              </span>
            )}
            {displayRuntime && (
              <span className="bg-zinc-800 px-2.5 py-0.5 rounded border border-zinc-700">
                {displayRuntime}
              </span>
            )}
            {displayGenre && (
              <span className="text-gray-400 border-l border-zinc-700 pl-3">
                {displayGenre}
              </span>
            )}
          </div>

          {/* Plot Synopsis */}
          <p className="text-base md:text-lg text-gray-300 line-clamp-3 md:line-clamp-4 leading-relaxed max-w-2xl">
            {displayPlot}
          </p>

          {displayDirector && (
            <p className="text-sm text-gray-400">
              <span className="text-gray-500">Directed by: </span>
              {displayDirector}
            </p>
          )}

          {/* Interactive Buttons */}
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={handleOpenDetails}
              className="flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-lg text-base md:text-lg hover:bg-gray-200 transition duration-200 active:scale-95 shadow-lg shadow-white/10"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch Info
            </button>

            <button
              onClick={handleOpenDetails}
              className="flex items-center gap-2 bg-zinc-800/80 hover:bg-zinc-700 text-white font-semibold px-6 py-3 rounded-lg text-base md:text-lg transition duration-200 active:scale-95 border border-zinc-600 backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              More Details
            </button>
          </div>
        </div>

        {/* Right Column: High-Res Poster Showcase */}
        <div className="w-full md:w-2/5 flex justify-center md:justify-end">
          <div
            onClick={handleOpenDetails}
            className="group relative cursor-pointer rounded-xl overflow-hidden shadow-2xl shadow-red-950/40 border border-zinc-800 max-w-[240px] md:max-w-[300px] transition-transform duration-300 hover:scale-105"
          >
            <img
              src={displayPoster}
              alt={displayTitle}
              className="w-full h-auto object-cover rounded-xl"
              onError={(e) => {
                e.currentTarget.src = FALLBACK_POSTER;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-white text-sm font-semibold flex items-center gap-1">
                Click for details →
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroMovie;

